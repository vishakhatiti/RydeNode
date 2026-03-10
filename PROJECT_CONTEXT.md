# PROJECT_CONTEXT.md

## Project Name

RYDENODE

Tri-Node Ride Hailing Platform

This file provides internal architecture context so that AI tools (like Codex) and developers understand how the system is designed.

---

# 1. System Concept

RYDENODE introduces a **Tri-Node transportation system**.

Traditional ride-hailing systems connect:

Customer → Driver

RYDENODE separates **vehicle ownership and driving service**.

New model:

Customer → Car Owner → Driver

This allows drivers without vehicles to work and vehicle owners to monetize idle cars.

---

# 2. System Roles

The system contains three main roles.

### Customer

Customers request rides.

Capabilities:

* Register / Login
* Request rides
* View ride history

---

### Driver

Drivers provide the driving service.

Capabilities:

* Accept ride requests
* Drive assigned vehicle
* View earnings

---

### Car Owner

Owners provide vehicles.

Capabilities:

* Register vehicles
* Approve driver usage
* Track vehicle activity

---

# 3. Backend Architecture

Backend uses:

Node.js
Express.js
MongoDB

Structure:

server

* controllers
* models
* routes
* middleware
* config
* utils

Controllers contain business logic.

Routes define API endpoints.

Models define database schemas.

Middleware handles authentication.

---

# 4. Frontend Architecture

Frontend uses:

React.js
React Router
Axios

Structure:

client/src

components → reusable UI
pages → main application pages
services → API communication layer

---

# 5. Database Models

Main MongoDB collections:

### User

Fields:

* name
* email
* password
* role (customer | driver | owner)

---

### Vehicle

Fields:

* ownerId
* vehicleNumber
* model
* availability

---

### Ride

Fields:

* customerId
* driverId
* vehicleId
* pickupLocation
* destination
* rideStatus

---

# 6. API Structure

Authentication APIs

POST /api/auth/register
POST /api/auth/login

Vehicle APIs

POST /api/vehicles
GET /api/vehicles

Ride APIs

POST /api/rides/request
GET /api/rides

---

# 7. Authentication

Authentication uses:

JWT (JSON Web Token)

Protected routes require a valid token.

Middleware:

authMiddleware.js

---

# 8. Current Tech Stack

Frontend

React
Axios
React Router

Backend

Node.js
Express.js
MongoDB

Deployment

Frontend → Vercel
Backend → Render

---

# 9. Future Architecture

Planned improvements:

Real-time ride matching using Socket.io
Driver location tracking
Google Maps integration
AI dispatch algorithm
Payment gateway integration

---

# 10. Development Notes for AI Tools

Important rules:

Do not modify environment variable names.

Database models should remain compatible with existing controllers.

API routes should maintain current naming convention.

Maintain separation of:

controllers
routes
models
middleware

Follow REST API standards when adding endpoints.

---

# End of Context
