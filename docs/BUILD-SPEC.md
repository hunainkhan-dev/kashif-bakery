# Kashif Bakery — Full MERN E-commerce (Build Spec)

Portfolio-grade, deployed, real full-stack. Reuse the existing bold/playful design (`index.html`) as the visual language.

## Stack
- **Frontend:** React (Vite) + Tailwind + React Router + Context (cart/auth)
- **Backend:** Node + Express (REST API)
- **DB:** MongoDB Atlas (free) + Mongoose
- **Auth:** JWT (admin) + bcrypt
- **Payments:** COD + WhatsApp order (keep) + optional Stripe test
- **Deploy:** frontend → Vercel · backend → Vercel (serverless) · DB → Atlas

## Folder structure
```
kashif-bakery/
├── client/           # React (Vite)
│   ├── src/
│   │   ├── pages/    Home, Checkout, OrderSuccess, AdminLogin, AdminDashboard
│   │   ├── components/ Nav, Hero, MenuGrid, ProductCard, CartDrawer, Footer
│   │   ├── context/  CartContext, AuthContext
│   │   └── api/      axios instance
│   └── .env          VITE_API_URL
└── server/           # Express
    ├── models/       User, Product, Order
    ├── routes/       auth, products, orders
    ├── middleware/   auth (JWT verify)
    ├── server.js
    └── .env          MONGO_URI, JWT_SECRET, (STRIPE_KEY)
```

## Data models
- **Product**: name, category(cakes/cupcakes/cookies/breads), price, desc, image, inStock
- **Order**: items[{productId,name,qty,price}], total, customer{name,phone,address}, status(pending/baking/out-for-delivery/delivered), paymentMethod, createdAt
- **User** (admin): email, passwordHash, role

## API routes
- `POST /api/auth/login` (admin) · `GET /api/auth/me`
- `GET /api/products` · `POST/PUT/DELETE /api/products/:id` (admin)
- `POST /api/orders` (create from cart) · `GET /api/orders` (admin) · `PATCH /api/orders/:id/status` (admin)

## Features
- Customer: browse menu (category filter), cart, checkout → **order saved to DB**, WhatsApp confirm, order-success page
- Admin: login → dashboard → add/edit/delete products, see orders live, update status
- Premium animated UI (reuse current design tokens: cream/pink/mustard, Fredoka, chunky shadows, GSAP reveals)
- Responsive, fast, accessible

## Security (non-negotiable for portfolio)
- bcrypt password hash, JWT with expiry, parameterized Mongoose queries, input validation (zod/express-validator), CORS locked, secrets in `.env` only, `.env` gitignored, helmet headers

## Deploy steps
1. MongoDB Atlas free cluster → get `MONGO_URI`
2. `server/` → Vercel (serverless via `vercel.json`), set env vars
3. `client/` → Vercel, set `VITE_API_URL` to the API URL
4. DB auto-seeds on first request (no manual step)

## README.md (make it impressive — this gets you hired)
```
# 🧁 Kashif Bakery — MERN E-commerce
Live: <vercel-url> · Admin demo: <url> (demo creds)
[hero screenshot] [admin screenshot]
## Features: menu, cart, DB orders, admin dashboard, JWT auth, WhatsApp order
## Stack: React, Tailwind, Node, Express, MongoDB, JWT
## Run locally: (steps)
```
+ pin repo on GitHub, post on LinkedIn (build-in-public), add to portfolio as a case study (problem → solution → tech → result).

## Portfolio project roadmap (order)
1. ✅ Kashif Bakery MERN (this) — e-commerce/full-stack
2. ✅ Sable / Lumen — SaaS dashboard (auth, CRUD, charts) — finish + deploy + README
3. ⬜ Real-time app — live order tracking or chat (Socket.io)
4. ⬜ AI app — e.g. "AI cake designer" or resume analyzer (LLM API) — 2026 demand
> 3 deployed + READMEs + LinkedIn posts = interviews + clients.
```
