# Base44 Dev Environment

## Project
Vite + React 18 + TypeScript frontend (Tailwind CSS). B2B commerce / agentic ecosystem UI ("NexusAI").

## Setup
- Single service: `web` (node:22-slim) running `npm run dev` with Vite.
- No database or backend services required — the app uses mock data (`src/data/mockData.ts`).
- Supabase client is initialized with placeholder fallback values (`lib/env.ts`) so the app boots without real Supabase credentials.

## Running
```
docker compose -f docker-compose.base44.yml up -d --build
```
App is served on port 3000. Vite dev server provides live reload.

## Notes
- `vite.config.ts` already sets `server.host: true` and `port: 3000`.
- No external secrets are required to boot. If real Supabase integration is needed later, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
