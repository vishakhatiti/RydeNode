# ARCHITECTURE.md

Single source of truth for how RydeNode is built. Update it when the design changes.

## 1. Product

Tri-node ride platform: **Customer → Car Owner → Driver**, plus an **Admin** who verifies and supervises.

| Role | Interface | Core jobs |
|---|---|---|
| Customer | Mobile-first web app | Book ride, see fare, track trip, history |
| Driver | Mobile-first web app | Go online, accept ride, start/complete, earnings |
| Car Owner | Dashboard | Register vehicles, approve ride requests, utilisation |
| Admin | Dashboard | Verify drivers/vehicles, monitor rides, complaints |

## 2. Constraints (current phase)

- Free tier only: MongoDB Atlas (M0), Render (API), Vercel (client).
- No OTP / email verification yet. Sign-up is open (admin accounts are never self-registered).
- Free maps: OpenStreetMap tiles via **Leaflet**, **Nominatim** for geocoding, **OSRM** public server for routes. Respect their usage policies (low volume, identify the app). Swap behind `services/geo` when volume grows.
- Render free tier sleeps: first request can be slow. Keep the client tolerant (loading states, retries).

## 3. System

```
React (Vercel)  --HTTPS-->  Express API (Render)  -->  MongoDB Atlas
      \--------- Socket.IO (same API host) ---------/
```

### Backend (`server/`)

```
config/       db connection
models/       User, Vehicle, Ride            (schemas only)
routes/       URL -> controller + middleware  (no logic)
controllers/  business logic
middleware/   authMiddleware (JWT), roleMiddleware
sockets/      real-time events
utils/        generateToken, helpers
```

Request lifecycle: `cors → json → route → authMiddleware (sets req.user) → authorizeRoles → controller → model`.

### Frontend (`client/src/`)

```
pages/        route-level screens, one folder per role
components/   reusable UI (GlassCard, Toast, Modal, ...)
contexts/     AuthContext, RideContext, ToastContext
services/     api.js (axios), socket.js, geo.js
hooks/        useAuth, useSocket
layouts/      MainLayout (public), DashboardLayout (role area)
```

Route guard: `ProtectedRoute` checks login + allowed roles, redirects to the role's home.

## 4. Ride lifecycle

`pending → owner_approved → driver_assigned → ongoing → completed`; `cancelled` from any non-terminal state.

Rules:
- Every transition is a single atomic `findOneAndUpdate` conditioned on the current status (prevents two drivers accepting one ride).
- Each transition emits a Socket.IO `rideStatus` event to the ride room.
- Only ride participants (and admin) can read or change a ride.

## 5. Security baseline

- Passwords hashed with bcrypt, never returned (`select: false`).
- JWT in `Authorization: Bearer`, 30-day expiry (shorten + refresh later).
- Role checks on every protected route; socket handshake authenticated.
- `CLIENT_URL` restricts CORS in production. Secrets only in env vars.

## 6. Deployment

- Render: `server/`, build `npm install`, start `npm start`. Env: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`.
- Vercel: `client/`. Env: `REACT_APP_API_URL`, `REACT_APP_SOCKET_URL`.

## 7. Later (not now)

OTP/email verification, document KYC, payments + revenue split, ratings, notifications, paid maps, admin analytics.
