# Relay

The easiest infrastructure API for developers to send transactional email — "Stripe for communications."

Create an account, use the platform default sender or link your own SMTP credentials, generate an API key, and send email — all built on Next.js with a MongoDB backend.

## Features

- **Auth** — email/password login, session-based auth, API key management
- **Sending** — REST API for transactional email with idempotency keys, templates, and a signed webhook system for delivery events (`delivered`, `bounced`, `opened`, `clicked`, `failed`, `complaint`)
- **Sender configuration** — use Relay's default platform sender or bring your own SMTP credentials
- **Dashboard** — logs, templates, webhooks, API keys, and account settings
- **Docs site** — quickstart, API reference, guides, and SDK docs

See [`.docs/`](./.docs) for the full product spec, technical plan, and design notes.

## Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB via Mongoose
- **Auth:** `jose` (JWT sessions), `bcryptjs` (password hashing)
- **Validation:** Zod

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example env file and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `AUTH_SECRET` | Session signing secret — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NEXT_PUBLIC_APP_URL` | Public base URL of this deployment (used to build API URLs in the dashboard's "Copy for AI" prompt) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | Platform default sender, used when a user/team hasn't configured their own SMTP credentials |

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project structure

```
src/app/
  (marketing)/   Public marketing pages (home, pricing, about, blog, ...)
  (docs)/        Docs site (quickstart, API reference, guides, SDKs, webhooks)
  (auth)/        Login / signup
  dashboard/     Authenticated dashboard (logs, templates, webhooks, API keys, settings)
  api/           Route handlers (auth, dashboard)
src/lib/         Auth, database models, dashboard helpers, content sources
```

## Deployment

Deployed on [Vercel](https://vercel.com). Set the environment variables above in the project's Vercel settings before deploying.
