# AGENTS.md

This file provides instructions for AI coding agents (Codex, Copilot, etc.) working on the RYDENODE repository.

The goal is to prevent accidental breaking of the backend architecture.

---

# Project Overview

RYDENODE is a MERN stack project implementing a **Tri-Node Ride Hailing Platform**.

Core idea:

Customer → Car Owner → Driver

The platform separates vehicle ownership from driving services.

---

# Tech Stack

Frontend

React
Axios
React Router

Backend

Node.js
Express.js
MongoDB
JWT Authentication

Deployment

Frontend → Vercel
Backend → Render

---

# Repository Structure

client → React frontend

server → Express backend

server architecture

config → database connection
controllers → business logic
models → MongoDB schemas
routes → API endpoints
middleware → authentication
utils → helper functions

---

# Critical Files (Do Not Modify Without Explicit Instruction)

server/config/db.js

server/models/*

server/middleware/authMiddleware.js

server/utils/generateToken.js

These files control database structure and authentication.

---

# Environment Variables

Environment variables are stored in

/server/.env

Required variables

PORT
MONGO_URI
JWT_SECRET
CLIENT_URL

Never expose secrets in code.

---

# Coding Rules

Follow MVC structure.

routes → define API endpoints

controllers → business logic

models → database schemas

middleware → authentication

Do not mix responsibilities.

---

# Database Rules

Use MongoDB ObjectId references.

Example relationships

rides.customerId → users._id

rides.driverId → users._id

rides.vehicleId → vehicles._id

Do not remove existing fields in models.

---

# Feature Development Guidelines

New features should follow this process:

1. Create or update controller logic
2. Define route in routes folder
3. Update model if required
4. Test API endpoints

---

# Safety Rules

Do not:

Delete existing routes
Rename database fields
Modify authentication logic
Remove environment variables

If unsure, request clarification before editing.

---

# End of AI Instructions
