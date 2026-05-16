# M.A.T-Fish Website

Next.js App Router site deployed on Cloudflare Workers with OpenNext.

## Stack

- Next.js 16 + React 19
- Tailwind CSS v4
- OpenNext Cloudflare adapter
- Cloudflare Workers + Wrangler

## Development

Install dependencies:

```bash
npm install
```

Create local env file from the example:

```bash
cp .dev.vars.example .dev.vars
```

Run local dev server:

```bash
npm run dev
```

## Contact form env vars

The contact form route (`src/app/api/contact/route.ts`) uses:

- `CONTACT_FORM_RECIPIENT`: email that receives form submissions
- `CONTACT_FORM_SENDER`: sender email used in outgoing messages
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional GA4 Measurement ID. Google Analytics loads only after cookie consent.

If env vars are missing, defaults are:

- recipient: `info@matfish.fi`
- sender: `website@matfish.fi`

## Build and preview

Next production build:

```bash
npm run build
```

Build and preview Worker locally:

```bash
npm run preview
```

## Deploy to Cloudflare

Set production vars first (in Cloudflare dashboard or Wrangler):

- `CONTACT_FORM_RECIPIENT`
- `CONTACT_FORM_SENDER`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

Deploy:

```bash
npm run cf:deploy
```

Optional: upload without deploying active version:

```bash
npm run cf:upload
```

## Wrangler config

Worker configuration is in `wrangler.toml`.

- `main = ".open-next/worker.js"`
- static assets served from `.open-next/assets`
- OpenNext self-service binding: `WORKER_SELF_REFERENCE`
