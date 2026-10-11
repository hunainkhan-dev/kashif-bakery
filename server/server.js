import 'dotenv/config';
import { env } from './config/env.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

const app = express();

// Behind a reverse proxy (Render/Vercel) — needed for correct client IPs + rate limiting.
app.set('trust proxy', 1);
app.disable('x-powered-by');

// ── Security headers & payload hardening ──
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '100kb' })); // small limit: this API only takes JSON orders/products
app.use(mongoSanitize()); // strip $ and . to block NoSQL operator injection
app.use(hpp()); // guard against HTTP parameter pollution

// ── CORS — allow only the configured client origin(s) ──
const allowed = env.CLIENT_URL.split(',').map((s) => s.trim());
app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / curl / server-to-server (no Origin header)
      if (!origin || allowed.includes(origin)) return cb(null, true);
      cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Global rate limit (defence-in-depth; login has its own stricter limit) ──
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please slow down.' },
  })
);

if (env.NODE_ENV !== 'production') app.use(morgan('dev'));

// ── Routes ──
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'kashif-bakery-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ── Fallbacks ──
app.use(notFound);
app.use(errorHandler);

// ── Boot ──
connectDB().then(() => {
  app.listen(env.PORT, () => console.log(`✔ Kashif Bakery API on http://localhost:${env.PORT} [${env.NODE_ENV}]`));
});

export default app;
