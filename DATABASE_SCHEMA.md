# DATABASE_SCHEMA.md

This document describes the MongoDB database schema used in the **RYDENODE Tri-Node Ride Hailing Platform**.

The database supports three core system roles:

Customer
Driver
Car Owner

The system separates **vehicle ownership and driving service**.

---

# Database

Database Name

rydenode

Main Collections

users
vehicles
rides

---

# 1️⃣ Users Collection

Collection name

users

This collection stores all platform users.

User roles

customer
driver
owner

Example Document

```
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "role": "customer",
  "createdAt": "timestamp"
}
```

Fields

_id → MongoDB ObjectId
name → user full name
email → unique email
password → hashed password
role → system role
createdAt → account creation date

---

# 2️⃣ Vehicles Collection

Collection name

vehicles

Vehicles are owned by **car owners**.

Example Document

```
{
  "_id": "ObjectId",
  "ownerId": "ObjectId",
  "vehicleNumber": "MH12AB1234",
  "model": "Toyota Innova",
  "availability": true,
  "createdAt": "timestamp"
}
```

Fields

_id → vehicle id
ownerId → reference to users collection
vehicleNumber → registration number
model → vehicle model
availability → if vehicle is available
createdAt → record creation date

Relationship

vehicles.ownerId → users._id

Only users with role **owner** can add vehicles.

---

# 3️⃣ Rides Collection

Collection name

rides

Stores ride requests and ride history.

Example Document

```
{
  "_id": "ObjectId",
  "customerId": "ObjectId",
  "driverId": "ObjectId",
  "vehicleId": "ObjectId",
  "pickupLocation": "Pune Station",
  "destination": "Hinjewadi Phase 1",
  "status": "pending",
  "createdAt": "timestamp"
}
```

Fields

_id → ride id
customerId → reference to user requesting ride
driverId → assigned driver
vehicleId → assigned vehicle
pickupLocation → ride start point
destination → ride end point
status → ride status
createdAt → ride request time

Ride Status Values

pending
accepted
ongoing
completed
cancelled

Relationships

rides.customerId → users._id
rides.driverId → users._id
rides.vehicleId → vehicles._id

---

# 4️⃣ Ride Lifecycle

Ride flow

Customer requests ride

↓

System creates ride document

↓

Vehicle owner approves vehicle usage

↓

Driver accepts ride

↓

Ride status changes to ongoing

↓

Ride completed

↓

Revenue split between driver and owner

---

# 5️⃣ Indexing Strategy

To improve performance:

users

email → unique index

vehicles

ownerId → index

rides

customerId → index
driverId → index
vehicleId → index
status → index

---

# 6️⃣ Future Schema Extensions

Planned collections

payments
driver_locations
ride_ratings
vehicle_maintenance

Example

payments

```
{
  "_id": "ObjectId",
  "rideId": "ObjectId",
  "amount": 500,
  "driverShare": 300,
  "ownerShare": 150,
  "platformFee": 50
}
```

---

# 7️⃣ Development Rules

When modifying database models:

* Keep relationships consistent
* Do not remove required fields
* Use ObjectId references
* Follow existing naming conventions

Models must match files inside

/server/models

---

# End of Database Schema
