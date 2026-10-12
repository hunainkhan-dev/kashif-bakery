# 🚀 Deploy Kashif Bakery (100% free, no credit card)

Architecture: **Vercel** (frontend) + **Vercel** (API, serverless) → **MongoDB Atlas** (database).
Two Vercel projects from the same GitHub repo — one for `client/`, one for `server/`.

Total time: ~15 minutes. Every service here has a free tier that needs **no credit card**.

> Why not Render/Railway/Koyeb? Their free tiers now ask for a card (Render, Koyeb) or run on
> limited trial credit (Railway). Vercel's Hobby plan and Atlas M0 are free with no card, so the
> whole stack lives on Vercel.

---

## 1) MongoDB Atlas — the database (~5 min)

1. Sign up at **https://www.mongodb.com/atlas** → create a **free M0 cluster** (no card required).
2. **Database Access** → Add a user (username + password). Save them.
3. **Network Access** → Add IP `0.0.0.0/0` (allow from anywhere — serverless functions have no fixed IP).
4. **Connect → Drivers** → copy the connection string. It looks like:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`
5. Add the database name before the `?`:
   `...mongodb.net/kashif-bakery?retryWrites=true&w=majority`
   → this whole string is your **`MONGO_URI`**.

---

## 2) Vercel — the API (serverless) (~5 min)

1. Sign up at **https://vercel.com** with GitHub → **Add New → Project** → import `kashif-bakery`.
2. Settings:
   - **Root Directory:** `server`
   - Framework preset: **Other** (the included `server/vercel.json` runs `api/index.js`).
3. **Environment Variables** → add:
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | *(from step 1)* |
   | `JWT_SECRET` | run `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` and paste |
   | `NODE_ENV` | `production` |
   | `ADMIN_EMAIL` | `admin@kashifbakery.com` |
   | `ADMIN_PASSWORD` | *(a strong password you choose)* |
   | `CLIENT_URL` | *(fill after step 3 — your frontend Vercel URL)* |
4. **Deploy.** Copy the URL, e.g. `https://kashif-bakery-api.vercel.app`.
5. Check it works: open `https://<your-api-url>/api/health` → should return `{"ok":true,…}`.
6. **Seeding is automatic** — on the first request the API detects an empty database and loads the
   menu + admin user by itself (no shell needed). Watch the Vercel **Logs** for
   `Empty database detected — seeding…`.

> No sleeping dyno here: serverless functions wake on each request with a ~1–2s cold start, then
> stay warm. Much snappier than a free always-on host.

---

## 3) Vercel — the frontend (~3 min)

1. **Add New → Project** → import `kashif-bakery` **again** (a second project).
2. Settings:
   - **Root Directory:** `client`
   - Framework preset: **Vite** (auto-detected)
3. **Environment Variables** → add:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | `https://<your-api-url>/api` *(from step 2)* |
4. **Deploy.** Copy your frontend URL, e.g. `https://kashif-bakery.vercel.app`.

---

## 4) Connect the two

1. Back in the **API project → Settings → Environment Variables**, set **`CLIENT_URL`** to your
   exact frontend URL (e.g. `https://kashif-bakery.vercel.app`, no trailing slash) → **Redeploy**.
   This unlocks CORS.
2. Open your frontend URL → the menu loads from the live API. 🎉
3. Admin: `https://<frontend-url>/admin` → `admin@kashifbakery.com` / *(your ADMIN_PASSWORD)*.

---

## 5) Polish the repo

- Update the **Live demo** links at the top of [`README.md`](../README.md) with your real URLs.
- Change the WhatsApp number in `client/src/lib/format.js` to the real bakery number.
- Pin the repo on your GitHub profile. Post it on LinkedIn (build-in-public).

## Troubleshooting

- **Menu doesn't load / CORS error** → `CLIENT_URL` on the API project must exactly match the
  frontend origin (no trailing slash), and you must redeploy the API after changing it.
- **`/api/health` 404** → Root Directory on the API project must be `server` so `vercel.json` is picked up.
- **500 on login** → `JWT_SECRET` missing or under 32 chars, or placeholder-looking in production.
- **Can't connect to DB / 503** → Atlas Network Access must allow `0.0.0.0/0`, and `MONGO_URI` must
  include the password and database name.
