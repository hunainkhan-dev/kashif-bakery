# Security Policy

Security is a first-class concern in this project. This document summarises the
controls in place and how to report an issue.

## Reporting a vulnerability

Please email **axiomwebbuilder@gmail.com** with details and reproduction steps.
Do not open a public issue for security reports. You'll get an acknowledgement
within 72 hours.

## Controls in place

**Authentication & authorisation**
- Passwords hashed with bcrypt (cost factor 12); hashes are never returned by the API.
- Stateless JWT auth with expiry; admin routes require a valid token and the `admin` role.
- Login endpoint is rate-limited (10 attempts / 15 min) to slow brute-force attacks.
- Generic login errors ("Invalid email or password") avoid user enumeration.

**Input handling**
- All request bodies validated and coerced with Zod schemas before use.
- `express-mongo-sanitize` strips `$`/`.` to block NoSQL operator injection.
- `hpp` guards against HTTP parameter pollution.
- JSON body size capped (100 kB).
- Order totals and prices are **recomputed on the server** from the database — the
  client cannot tamper with amounts.

**Transport & headers**
- `helmet` sets secure HTTP headers; `x-powered-by` disabled.
- CORS restricted to the configured client origin(s).
- `trust proxy` enabled for correct client IPs and rate limiting behind Render/Vercel.
- Global rate limit (300 req / 15 min per IP) as defence-in-depth.

**Configuration**
- Environment is validated at boot (Zod); the server refuses to start with a
  missing `MONGO_URI` or a weak/placeholder `JWT_SECRET` in production.
- Secrets live only in `.env`, which is gitignored. `.env.example` documents the shape.

## Secrets checklist before deploy
- [ ] `JWT_SECRET` is a fresh 48+ byte random hex value
- [ ] `ADMIN_PASSWORD` changed from the seed default
- [ ] `MONGO_URI` user has least-privilege access to the app database only
- [ ] `CLIENT_URL` set to the exact deployed frontend origin
