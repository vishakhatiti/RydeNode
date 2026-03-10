import React, { useState } from "react";
import API from "../services/api";

function RequestRide() {

  const [pickup,setPickup] = useState("");
  const [drop,setDrop] = useState("");

  const requestRide = async () => {

    const res = await API.post("/rides/request",{
      pickupLocation: pickup,
      dropLocation: drop
    });

    console.log(res.data);

    alert("Ride Requested");

  };

  return (
    <div>

      <h2>Request Ride</h2>

      <input
      placeholder="Pickup"
      onChange={e=>setPickup(e.target.value)}
      />

      <input
      placeholder="Drop"
      onChange={e=>setDrop(e.target.value)}
      />

      <button onClick={requestRide}>
        Request Ride
      </button>

    </div>
  );
}

export default RequestRide;