# 🚀 Deploy Kashif Bakery (free tier)

Architecture: **Vercel** (frontend) → **Render** (API) → **MongoDB Atlas** (database).
The repo is already on GitHub, so each service imports it in a few clicks.

Total time: ~15 minutes. All three are free.

---

## 1) MongoDB Atlas — the database (~5 min)

1. Sign up at **https://www.mongodb.com/atlas** → create a **free M0 cluster**.
2. **Database Access** → Add a user (username + password). Save them.
3. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere — needed for Render).
4. **Connect → Drivers** → copy the connection string. It looks like:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`
5. Add the database name before the `?`:
   `...mongodb.net/kashif-bakery?retryWrites=true&w=majority`
   → this whole string is your **`MONGO_URI`**.

---

## 2) Render — the API (~5 min)

1. Sign up at **https://render.com** with GitHub → **New → Web Service**.
2. Pick the **`kashif-bakery`** repo.
3. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance type:** Free
4. **Environment** → add these variables:
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | *(from step 1)* |
   | `JWT_SECRET` | run `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` and paste |
   | `NODE_ENV` | `production` |
   | `ADMIN_EMAIL` | `admin@kashifbakery.com` |
   | `ADMIN_PASSWORD` | *(a strong password you choose)* |
   | `CLIENT_URL` | *(fill after step 3 — your Vercel URL)* |
5. **Create Web Service.** When it's live, copy the URL, e.g. `https://kashif-bakery-api.onrender.com`.
6. **Seed the database once:** Render dashboard → the service → **Shell** tab → run:
   `npm run seed`

> Note: the free API "sleeps" after 15 min idle; the first request then takes ~50s to wake. Fine for a portfolio demo.

---

## 3) Vercel — the frontend (~3 min)

1. Sign up at **https://vercel.com** with GitHub → **Add New → Project** → import `kashif-bakery`.
2. Settings:
   - **Root Directory:** `client`
   - Framework preset: **Vite** (auto-detected)
3. **Environment Variables** → add:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://<your-render-url>/api` |
4. **Deploy.** Copy your Vercel URL, e.g. `https://kashif-bakery.vercel.app`.

---

## 4) Connect the two

1. Back in **Render → Environment**, set **`CLIENT_URL`** to your exact Vercel URL
   (e.g. `https://kashif-bakery.vercel.app`) → save (it redeploys). This unlocks CORS.
2. Open your Vercel URL → the menu loads from the live API. 🎉
3. Admin: `https://<vercel-url>/admin` → `admin@kashifbakery.com` / *(your ADMIN_PASSWORD)*.

---

## 5) Polish the repo

- Update the **Live demo** links at the top of [`README.md`](../README.md) with your real URLs.
- Change the WhatsApp number in `client/src/lib/format.js` to the real bakery number.
- Pin the repo on your GitHub profile. Post it on LinkedIn (build-in-public).

## Troubleshooting

- **Menu doesn't load / CORS error** → `CLIENT_URL` on Render must exactly match the Vercel origin (no trailing slash).
- **500 on login** → `JWT_SECRET` missing or under 32 chars, or DB not seeded (`npm run seed`).
- **Can't connect to DB** → Atlas Network Access must allow `0.0.0.0/0`.
