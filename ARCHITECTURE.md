# ARCHITECTURE.md

This document describes the **system architecture of the RYDENODE platform**.

RYDENODE is designed as a **Tri-Node Ride Hailing Platform** connecting:

Customer
Car Owner
Driver

The system separates **vehicle ownership from driving service**.

---

# 1. High Level Architecture

The platform follows a **client-server architecture**.

Frontend applications communicate with backend APIs.

Architecture flow

Client (React App)

↓

API Server (Node.js + Express)

↓

Database (MongoDB Atlas)

---

# 2. Frontend Layer

Location

/client

Technology

React.js
React Router
Axios

Responsibilities

User Interface
Form handling
API communication
Session management

Main Components

pages → main views
components → reusable UI elements
services → API calls

Example

client/src/services/api.js

Handles all backend requests.

---

# 3. Backend Layer

Location

/server

Technology

Node.js
Express.js
MongoDB
JWT Authentication

Backend responsibilities

Business logic
Authentication
Database interaction
Ride management

Backend architecture

controllers → application logic
routes → API endpoints
models → MongoDB schemas
middleware → authentication
config → database connection
utils → helper functions

---

# 4. Database Layer

Database

MongoDB Atlas

Collections

users
vehicles
rides

Relationships

users → vehicles
users → rides
vehicles → rides

The database supports the **Tri-Node ride system**.

---

# 5. Ride Request Flow

Step 1

Customer requests ride.

↓

Step 2

Ride document created in database.

↓

Step 3

Vehicle owner approves vehicle.

↓

Step 4

Driver accepts ride.

↓

Step 5

Ride status changes to ongoing.

↓

Step 6

Ride completed and payment distributed.

---

# 6. Authentication System

Authentication uses **JWT (JSON Web Tokens)**.

Flow

User logs in

↓

Server generates token

↓

Client stores token

↓

Token sent in Authorization header

Example

Authorization: Bearer <token>

Middleware

/server/middleware/authMiddleware.js

Protects private routes.

---

# 7. Deployment Architecture

Frontend

Hosted on Vercel.

Backend

Hosted on Render.

Database

MongoDB Atlas.

Production flow

User → Vercel → Backend API → MongoDB

---

# 8. Future System Architecture

Planned improvements

Real-time ride matching
Driver location tracking
Google Maps integration
Payment system
Ride analytics

Possible future stack

Socket.io
Redis
Microservices architecture

---

# End of Architecture Document
