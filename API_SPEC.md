# API_SPEC.md

This file documents all backend APIs for the **RYDENODE Tri-Node Ride Hailing Platform**.

Purpose:

* Help developers understand backend endpoints
* Improve AI coding accuracy (Codex)
* Provide clear request/response documentation

---

# Base API URL

Local development

http://localhost:5000/api

Production (example)

https://rydenode-backend.onrender.com/api

---

# 1️⃣ Authentication APIs

## Register User

POST /api/auth/register

Description
Registers a new user in the system.

Request Body

```
{
"name": "John Doe",
"email": "john@example.com",
"password": "123456",
"role": "customer"
}
```

Roles allowed

customer
driver
owner

Response

```
{
"_id": "user_id",
"name": "John Doe",
"email": "john@example.com",
"role": "customer",
"token": "jwt_token"
}
```

---

## Login User

POST /api/auth/login

Description
Authenticates a user and returns JWT token.

Request Body

```
{
"email": "john@example.com",
"password": "123456"
}
```

Response

```
{
"_id": "user_id",
"name": "John Doe",
"email": "john@example.com",
"role": "customer",
"token": "jwt_token"
}
```

---

# 2️⃣ Vehicle APIs

## Add Vehicle

POST /api/vehicles

Authentication
Required (Owner only)

Description
Allows a vehicle owner to register a car.

Request Body

```
{
"vehicleNumber": "MH12AB1234",
"model": "Toyota Innova",
"availability": true
}
```

Response

```
{
"_id": "vehicle_id",
"ownerId": "owner_id",
"vehicleNumber": "MH12AB1234",
"model": "Toyota Innova",
"availability": true
}
```

---

## Get All Vehicles

GET /api/vehicles

Description
Returns all registered vehicles.

Response

```
[
{
"_id": "vehicle_id",
"model": "Toyota Innova",
"vehicleNumber": "MH12AB1234"
}
]
```

---

# 3️⃣ Ride APIs

## Request Ride

POST /api/rides/request

Authentication
Required (Customer)

Description
Customer requests a ride.

Request Body

```
{
"pickupLocation": "Pune Station",
"destination": "Hinjewadi Phase 1"
}
```

Response

```
{
"_id": "ride_id",
"customerId": "customer_id",
"pickupLocation": "Pune Station",
"destination": "Hinjewadi Phase 1",
"status": "pending"
}
```

---

## Get All Rides

GET /api/rides

Authentication
Required

Description
Returns rides for the logged-in user.

Response

```
[
{
"_id": "ride_id",
"pickupLocation": "Pune Station",
"destination": "Hinjewadi Phase 1",
"status": "completed"
}
]
```

---

# 4️⃣ Authentication Header

Protected APIs require JWT token.

Header format

```
Authorization: Bearer <token>
```

Example

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

# 5️⃣ API Response Status Codes

200 → Success
201 → Resource created
400 → Bad request
401 → Unauthorized
404 → Resource not found
500 → Server error

---

# 6️⃣ Future APIs (Planned)

Driver assignment
Owner approval system
Real-time ride tracking
Payment integration
Ride rating system

---

# 7️⃣ Development Notes

When adding new APIs:

* Follow REST naming conventions
* Place route definitions in `/server/routes`
* Business logic in `/server/controllers`
* Data models in `/server/models`
* Authentication middleware in `/server/middleware`

---

# End of API Specification
