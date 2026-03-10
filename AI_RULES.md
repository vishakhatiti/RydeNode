# AI_RULES.md

This file defines rules for AI coding tools such as Codex when modifying the RYDENODE project.

These rules prevent AI from breaking core project structure.

---

# 1. Do Not Modify Environment Variables

Do not rename or remove environment variables.

Required variables

PORT
MONGO_URI
JWT_SECRET
CLIENT_URL

Environment variables are defined in

/server/.env

---

# 2. Maintain Folder Structure

Do not change the core folder structure.

Required structure

server
controllers
routes
models
middleware
config
utils

client
components
pages
services

---

# 3. Keep MVC Separation

Follow this structure

routes → define API routes
controllers → contain business logic
models → database schema definitions
middleware → authentication logic

Do not mix responsibilities between files.

---

# 4. API Naming Rules

Use RESTful naming.

Examples

GET /api/rides
POST /api/rides
POST /api/auth/login

Avoid inconsistent naming.

---

# 5. Database Rules

Do not remove existing fields in models.

Use MongoDB ObjectId for relationships.

Example

rides.customerId → users._id
rides.driverId → users._id
rides.vehicleId → vehicles._id

---

# 6. Security Rules

Never expose

password hashes
JWT secret
MongoDB URI

Sensitive data must remain in environment variables.

---

# 7. Code Style Rules

Use async/await for database calls.

Use clear variable names.

Handle errors using try/catch.

Example

try {
const data = await Model.find()
} catch (error) {
res.status(500).json({ message: error.message })
}

---

# 8. Commit Safety

When making changes

Modify minimal files required.

Do not remove working APIs unless explicitly instructed.

---

# End of AI Rules
