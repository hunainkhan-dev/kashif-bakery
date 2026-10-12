import 'dotenv/config';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import { seedData } from './seed.js';
import app from './app.js';

// Local / long-running entry point (`npm run dev`, `npm start`).
// On Vercel the app is served by api/index.js instead — see that file.
async function start() {
  try {
    await connectDB();
  } catch {
    // Local dev: a bad DB config should fail fast and loudly.
    process.exit(1);
  }

  // First-run convenience: if the catalogue is empty, seed products + admin once.
  // Safe + idempotent — only runs against an empty database, so it never wipes data.
  if (process.env.SEED_ON_START !== 'false') {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('• Empty database detected — seeding products + admin…');
      await seedData();
    }
  }

  app.listen(env.PORT, () => console.log(`✔ Kashif Bakery API on http://localhost:${env.PORT} [${env.NODE_ENV}]`));
}

start();

export default app;
