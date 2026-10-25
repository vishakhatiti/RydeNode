# ROADMAP.md

Build one phase at a time. Each phase ends with a manual test before the next starts.
Status: ⬜ todo · 🟨 in progress · ✅ done

## Phase 1 — Auth foundation 🟨
- Hash passwords, real login, JWT middleware, `/auth/me`
- Add `admin` role (never self-registered)
- Never return password
- **Test:** register 3 roles, login, call a protected route with/without token

## Phase 2 — Frontend shell + design system ⬜
- Tailwind tokens, shared components: Button, Input, Card, Modal, Toast (popups)
- Auth pages wired to API, `ProtectedRoute`, role-based redirect, navbar by role
- Remove dead files (`*.js` duplicates, `client-temp/`) — confirm first
- **Test:** register → login → land on correct dashboard; refresh keeps session

## Phase 3 — Vehicles (Owner) ⬜
- Fix field contract (`vehicleNumber`, `model`, `type`), list/add/toggle/delete UI
- **Test:** owner adds a vehicle; other roles are blocked

## Phase 4 — Ride request + lifecycle ⬜
- Customer request (pickup/destination with free-map search), fare estimate
- Owner approve/reject (scoped), driver accept/start/complete (atomic), cancel
- Fix history field names
- **Test:** full ride across 3 browser profiles

## Phase 5 — Real-time + maps ⬜
- Leaflet map, OSRM route, driver location to customer, `rideStatus` events
- **Test:** customer sees driver move and status change live

## Phase 6 — Admin ⬜
- Verify/suspend drivers and vehicles, ride monitor, basic stats

## Phase 7 — Polish + deploy ⬜
- Animations, empty/loading/error states, mobile pass, Render + Vercel deploy, smoke test

## Later
OTP, KYC documents, payments + revenue split, ratings, notifications, tests/CI.

## Working agreement
- Small commits per phase; no commit/push unless asked.
- Protected files (models, auth middleware, `generateToken`, `db.js`) are edited only when the phase requires it.
- Never rename existing DB fields; add new ones.
