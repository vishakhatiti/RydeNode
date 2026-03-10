# RYDENODE 🚗

### Tri-Node Ride Hailing Platform

RYDENODE is an experimental ride-hailing platform that introduces a **three-node mobility ecosystem** instead of the traditional two-node ride-sharing model.

Traditional platforms connect **Customers and Drivers**, but they assume that the driver owns the vehicle.

RYDENODE separates **vehicle ownership and driving service**, enabling a more flexible transportation marketplace.

---

# 🌍 Core Idea

Traditional Model

Customer → Driver (who owns the car)

RYDENODE Model

Customer → Car Owner → Driver

This allows:

• Drivers without vehicles to work
• Vehicle owners to monetize idle vehicles
• Customers to access more ride supply

This architecture creates a **more efficient mobility marketplace**.

---

# 🧩 Platform Nodes

## 1️⃣ Customer

Customers use the platform to request rides.

Features

• Request ride
• Track driver location
• View estimated price
• Pay digitally
• Rate ride experience

---

## 2️⃣ Car Owner

Car owners list vehicles on the platform.

They can:

• Register vehicles
• Set availability schedules
• Assign drivers
• Monitor vehicle usage
• Earn passive income

Example

A car owner can make their car available:

9AM – 5PM while at work
Evening hours for city rides
Weekend rental usage

---

## 3️⃣ Driver

Drivers provide the driving service but may not own vehicles.

Drivers can:

• Accept ride requests
• Pick available vehicles
• Select shifts
• Earn from completed rides

Benefits

• No vehicle purchase required
• Flexible working hours
• Access to multiple vehicles

---

# ⚙️ System Workflow

### Step 1 — Ride Request

Customer submits:

Pickup location
Destination
Ride type

---

### Step 2 — Owner Approval

Nearby vehicle owners receive the request.

Owner can:

Approve
Reject
Auto-assign

---

### Step 3 — Driver Assignment

Once a vehicle is approved:

Available drivers receive ride notifications.

Driver accepts the ride.

---

### Step 4 — Ride Execution

Driver reaches pickup location and completes the trip.

---

### Step 5 — Revenue Split

Payment is automatically divided.

Example

Ride Fare = ₹500

Driver → ₹300
Car Owner → ₹150
Platform Fee → ₹50

---

# 🧠 System Architecture

The platform follows a **client-server architecture**.

Frontend clients communicate with backend APIs which interact with the database.

Ride-hailing systems must efficiently match demand (riders) with supply (drivers) in real time while managing trip data and user profiles. ([weixia.info][1])

High-level architecture

Client Apps
↓
API Server
↓
Database

---

# 💻 Tech Stack

## Frontend

React.js
Axios
React Router

---

## Backend

Node.js
Express.js
JWT Authentication

---

## Database

MongoDB Atlas

---

## Deployment

Frontend → Vercel
Backend → Render

---

# 📁 Project Structure

```
rydenode
│
├── client
│   ├── public
│   │    index.html
│   │
│   └── src
│       ├── components
│       │      Navbar.js
│       │
│       ├── pages
│       │      Home.js
│       │      Login.js
│       │      Register.js
│       │      RequestRide.js
│       │      AddVehicle.js
│       │
│       └── services
│              api.js
│
├── server
│   ├── config
│   │      db.js
│   │
│   ├── controllers
│   │      authController.js
│   │      rideController.js
│   │      vehicleController.js
│   │
│   ├── middleware
│   │      authMiddleware.js
│   │
│   ├── models
│   │      User.js
│   │      Vehicle.js
│   │      Ride.js
│   │
│   ├── routes
│   │      authRoutes.js
│   │      rideRoutes.js
│   │      vehicleRoutes.js
│   │
│   └── utils
│         generateToken.js
│
└── README.md
```

---

# 🔐 Environment Variables

Create a `.env` file in the `server` directory.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

Never push `.env` files to GitHub.

---

# 🚀 Running the Project Locally

### Install dependencies

Backend

```
cd server
npm install
```

Frontend

```
cd client
npm install
```

---

### Run Backend

```
npm run dev
```

---

### Run Frontend

```
npm start
```

---

# 📈 Future Enhancements

Planned improvements

• Real-time ride matching using Socket.io
• Driver location tracking
• Google Maps integration
• AI ride dispatch algorithm
• Payment gateway integration
• Fleet analytics dashboard
• Microservices architecture

---

# 🎯 Goal of the Project

RYDENODE explores a **new economic model for mobility** by separating vehicle ownership and driving services.

This creates opportunities for:

Drivers without vehicles
Owners with idle vehicles
Customers seeking affordable rides

---

# 📜 License

This project is for **educational and experimental purposes**.
