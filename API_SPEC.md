# API_SPEC.md

Base URL: `http://localhost:5000/api` (local) · `REACT_APP_API_URL` (client).
Protected routes need `Authorization: Bearer <token>`. Errors are `{ "error": "message" }`.

Status legend: ✅ working · 🟨 backend ready, needs auth tested end-to-end · ⬜ planned

## Auth

| Method | Path | Auth | Status | Notes |
|---|---|---|---|---|
| POST | `/auth/register` | none | ✅ | Body `{name,email,password,role}`; role ∈ customer/driver/owner; password ≥ 6; 409 if email exists. Returns `{_id,name,email,role,token}` |
| POST | `/auth/login` | none | ✅ | Body `{email,password}`; 401 on bad credentials. Same response as register |
| GET | `/auth/me` | any | ✅ | Returns current user |

## Vehicles (owner)

| Method | Path | Status | Notes |
|---|---|---|---|
| POST | `/vehicles` | 🟨 | `{vehicleNumber,model,type(sedan/suv/hatchback/luxury),availability}` |
| GET | `/vehicles/my` | 🟨 | Owner's vehicles |
| PATCH | `/vehicles/:id` | 🟨 | `{availability:boolean}` |
| DELETE | `/vehicles/:id` | 🟨 | |

## Rides

| Method | Path | Role | Status | Notes |
|---|---|---|---|---|
| POST | `/rides/request` | customer | 🟨 | `{pickupLocation,destination}` |
| GET | `/rides/my` | customer | 🟨 | History |
| GET | `/rides/owner/pending` | owner | 🟨 | Pending requests |
| PATCH | `/rides/:id/approve` | owner | 🟨 | `{vehicleId}` |
| PATCH | `/rides/:id/reject` | owner | 🟨 | |
| GET | `/rides/available` | driver | 🟨 | Owner-approved rides |
| PATCH | `/rides/:id/accept` | driver | 🟨 | Will become atomic (Phase 4) |
| PATCH | `/rides/:id/start` | driver | 🟨 | |
| PATCH | `/rides/:id/complete` | driver | 🟨 | |
| PATCH | `/rides/:id/cancel` | participant | 🟨 | |
| GET | `/rides/:id` | participant | 🟨 | |

## Real-time (Socket.IO)

Handshake `auth: { token }`. Currently drivers only; customer subscription planned (Phase 5).
Events: `joinRideRoom`, `driverLocationUpdate` (client → server); `driverLocation`, `locationError` (server → client); `rideStatus` planned.

## Planned
Admin: verify/suspend users and vehicles, ride monitor, stats. Fare estimate. Geocoding/route helpers.
