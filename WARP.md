# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project layout

- `frontend/` – React + Vite SPA for the kiosk-style "SUVIDHA" civic services UI.
  - `src/main.jsx` – top-level React entry; mounts `<App />` inside nested providers: `LanguageProvider`, `AuthProvider`, `NotificationProvider`.
  - `src/App.jsx` – React Router configuration and route protection. Public routes for attract screen, language selection, login, accessibility; protected routes for dashboard, service hubs (electricity, water, gas, sanitation, solar) and billing/usage pages.
  - `src/pages/` – screen-level pages (e.g. `AttractScreen`, `LanguageSelection`, `Login`, `Dashboard`, `AllBills`, `AllUsage`, `Accessibility`, `NotFound`). These compose common components and service-specific flows.
  - `src/components/common/` – shared UI primitives (header/footer shell, service cards, language selector, status badges, progress bar, document upload, loading spinner).
  - `src/components/services/` – service hubs and flows for electricity, water, gas, sanitation, solar; central API client in `services/api.js` encapsulates all HTTP calls.
  - `src/context/` (not listed above but used from `main.jsx`/components) – `AuthContext`, `LanguageContext`, `NotificationContext` controlling authentication, localization, and toast-style notifications.
  - `src/utils/` & `src/data/` – helper functions (formatting, validation, status helpers, application number generation) and static mock data for bills/usage and location lists.

- `backEnd2/` – Node.js + Express + Prisma backend API.
  - `src/server.js` – boots the Express app, reading `PORT` from env (default `4000`).
  - `src/app.js` – Express app factory: middleware (JSON, CORS, auth hooks) and route registration.
  - `src/routes/` – route modules by domain: `public`, `auth`, `citizen`, `billing`, `applications`, `grievances`, `special`, `admin`, `adminAuth`. These correspond closely to the client-side APIs in `frontend/src/components/services/api.js`.
  - `prisma/` – Prisma schema and migrations (see `backEnd2/README.md` for setup and migration commands).
  - `scripts/` – helper scripts such as `create-admin.js` and `smoke-test.js`.

There is no monorepo root build; front‑end and back‑end are developed and run from their respective subdirectories.

## Frontend: development & build

From the repository root:

```bash
cd frontend
npm install        # one-time
npm run dev        # start Vite dev server (default http://localhost:5173)
```

Other useful commands (still inside `frontend/`):

- **Production build**
  - `npm run build` – Vite production build into `dist/`.
  - `npm run preview` – serve the built app locally.
- **Linting**
  - `npm run lint` – ESLint over all `js`/`jsx` sources with zero allowed warnings.

### Frontend architecture & data flow

- **Routing & shell**
  - `src/main.jsx` wraps the app with language/auth/notification providers and renders `<App />`.
  - `src/App.jsx` configures `react-router-dom` with:
    - Public routes: `/` (`AttractScreen`), `/language`, `/login`, `/accessibility`.
    - Auth‑guarded routes via a `Protected` higher‑order component that reads `user` from `AuthContext` and redirects unauthenticated users to `/login`.
    - Service hubs: `/electricity`, `/water`, `/gas`, `/sanitation`, `/solar` plus nested routes such as `/electricity/new-connection`.
    - Billing/usage views: `/all-bills`, `/all-usage`, plus a catch‑all `*` → `NotFound`.
  - `Header` and `Footer` from `components/common` provide the persistent application chrome used across pages and hubs.

- **State & context**
  - `LanguageContext` exposes `language`, `t(key)` translation helper, and `changeLanguage`. It drives all user‑facing copy, including the attract screen, accessibility flows, and language selector variants.
  - `AuthContext` manages the logged‑in user, OTP‑based login (`sendOTP`, `verifyOTP`), admin vs citizen roles, and `logout`. The login page (`pages/Login.jsx`) uses this context plus `useNotification` to orchestrate the two‑step phone/OTP flow.
  - `NotificationContext` drives toast/alert helpers (`success`, `error`, etc.), consumed heavily in login and long‑running flows (e.g. new connection wizard) for UX feedback.

- **Service hubs & flows**
  - Each domain (electricity, water, gas, sanitation, solar) has a hub component under `components/services/<domain>/<Domain>Hub.jsx` that:
    - Renders a hero section describing the service.
    - Shows a grid of actions (e.g. new connection, load management, billing, tracking) with navigation to nested routes.
  - Complex multi‑step flows live in components like `components/services/electricity/NewConnection.jsx`:
    - Maintain a `step` index and `formData` state with validation per step.
    - Use `ProgressBar` to render step indicators and animate progress.
    - Persist drafts to `localStorage` and restore them on mount.
    - Use `DocumentUpload` for mock DigiLocker/QR uploads.
    - Generate application numbers via `generateApplicationNumber` utilities.

- **Dashboards & visualizations**
  - `pages/Dashboard.jsx` is the main logged‑in experience: uses `ServiceCard` tiles for core services, quick‑action buttons, and framer‑motion for animations.
  - `pages/AllBills.jsx` and `pages/AllUsage.jsx` are read‑heavy views that consume `MOCK_BILLS` and `MOCK_CONSUMPTION_HISTORY` from `utils/mockdata` and render them with Tailwind + Recharts charts (`BarChart`, `ResponsiveContainer`) and `StatusBadge` components.
  - `pages/AttractScreen.jsx` implements the kiosk‑style landing experience with auto‑advancing government schemes, weather and time widgets, language shortcuts, and an accessibility panel.
  - `pages/Accessibility.jsx` surfaces dedicated accessibility information and shortcuts, complementing the attract screen’s in‑place accessibility controls.

- **HTTP and backend integration**
  - `components/services/api.js` centralizes all HTTP calls via an `axios` instance:
    - `baseURL` is `import.meta.env.VITE_API_URL` with a fallback to `http://localhost:8000`.
    - A request interceptor injects `X-User-ID` from `localStorage.user.id` when present.
    - A response interceptor clears local user state and redirects to `/login` on HTTP 401.
  - Domain‑specific API namespaces map directly to backend routes in `backEnd2/src/routes/`:
    - `authAPI` → `/auth/send-otp`, `/auth/verify-otp`.
    - `applicationsAPI` → `/applications/*`.
    - `billsAPI` → `/bills/*`.
    - `paymentsAPI` → `/payments/*`.
    - `grievancesAPI` → `/grievances/*`.
    - `solarAPI` → `/solar/*`.
    - `documentsAPI` → `/documents/*` (multipart uploads for document handling).
  - For local development, set `VITE_API_URL` to your backend port, e.g. `http://localhost:4000`, so the frontend talks to the running `backEnd2` service instead of the default `8000`.

There is currently no dedicated frontend test suite or `npm test` script defined; rely on manual testing via the Vite dev server and backend smoke tests.

## Backend (backEnd2): development & APIs

From the repository root:

```bash
cd backEnd2
npm install          # one-time
npm run prisma:generate
npx prisma migrate dev --name init   # first-time DB setup
npm run dev         # start API (default http://localhost:4000)
```

Useful scripts in `backEnd2/package.json`:

- `npm run dev` – start the Express server (`src/server.js`) with your current `.env` configuration.
- `npm run prisma:generate` – generate the Prisma client after editing the schema.
- `npx prisma migrate dev --name <migration-name>` – apply migrations and update the DB.
- `npm run smoke` – run a basic smoke test script (`scripts/smoke-test.js`) against a running backend.
- `npm run admin:create -- <email> <password> "Full Name"` – convenience wrapper around `scripts/create-admin.js` to create an initial admin user.

### Backend configuration

- Configure environment variables in `backEnd2/.env` as described in `backEnd2/README.md` (database URL, JWT secrets for citizen/admin, default OTP, and `PORT` if you want to override the default `4000`).
- The backend uses Prisma with a PostgreSQL `DATABASE_URL` by default.
- After changing Prisma schema, always re‑run `npm run prisma:generate` and `npx prisma migrate dev` before starting the server.

### Backend routing & responsibilities (high level)

- `src/app.js` wires up shared middleware (CORS, JSON parsing, auth) and mounts route modules under `/api/*` (see the actual file for exact prefixes).
- Route modules under `src/routes/` separate concerns by domain:
  - `public.js` – unauthenticated, read‑only endpoints that never touch the `Citizen` table.
  - `auth.js` / `adminAuth.js` – OTP and admin authentication flows; issue JWTs consumed by the frontend and enforced by downstream routes.
  - `citizen.js` – citizen profile and related operations keyed by phone number or user ID.
  - `applications.js` – CRUD and tracking for service applications; integrates with `applicationsAPI` on the frontend.
  - `billing.js` – bill lookup and listing by consumer number/user; powers `billsAPI` and the All Bills/All Usage pages.
  - `grievances.js` – complaint submission and status updates; powers `grievancesAPI`.
  - `special.js` / `solar.js` (if present) – endpoints implementing special programmes like solar subsidy calculators and vendor listings, used by `solarAPI`.
  - `admin.js` – administrative operations (e.g. dashboard, approvals) gated by admin JWTs from `adminAuth`.

## Coordinating frontend & backend

- **Typical local workflow**
  1. Start the backend:
     - `cd backEnd2 && npm run dev` (ensure DB and Prisma are set up first).
  2. Set `VITE_API_URL` in `frontend/.env` to point to the backend, e.g. `VITE_API_URL=http://localhost:4000`.
  3. Start the frontend:
     - `cd frontend && npm run dev`.
  4. Open the Vite dev URL (usually `http://localhost:5173`) and go through the attract → language selection → login → dashboard flows.

- **Authentication & test users**
  - The login screen supports OTP‑based login for citizens and a special admin phone number (see `pages/Login.jsx` and backend auth routes).
  - The backend README includes an example `DEFAULT_OTP` and `admin:create` command for spinning up a test admin user.

- **Running checks before pushing**
  - For frontend‑only changes: from `frontend/`, run `npm run lint` and exercise the affected flows in `npm run dev`.
  - For backend changes: from `backEnd2/`, run `npm run prisma:generate` if schema changed, restart `npm run dev`, and run `npm run smoke` for a quick regression check.

## Notes for future Warp agents

- This repository is split into two largely independent Node/JS projects; always `cd` into `frontend/` or `backEnd2/` before running npm scripts.
- When touching HTTP contracts, update both `backEnd2/src/routes/*` and the corresponding methods in `frontend/src/components/services/api.js` to keep them in sync.
- The kiosk UX relies heavily on React context and framer‑motion; when adding new flows, reuse existing patterns from `Dashboard`, `AttractScreen`, and `NewConnection` rather than introducing new state management approaches.
