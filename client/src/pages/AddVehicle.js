import React, { useState } from "react";
import API from "../services/api";

function AddVehicle() {

  const [vehicleNumber,setVehicleNumber] = useState("");
  const [model,setModel] = useState("");

  const addVehicle = async () => {

    const res = await API.post("/vehicles/add",{
      vehicleNumber,
      model
    });

    console.log(res.data);

    alert("Vehicle Added");

  };

  return (
    <div>

      <h2>Add Vehicle</h2>

      <input
      placeholder="Vehicle Number"
      onChange={e=>setVehicleNumber(e.target.value)}
      />

      <input
      placeholder="Model"
      onChange={e=>setModel(e.target.value)}
      />

      <button onClick={addVehicle}>
        Add Vehicle
      </button>

    </div>
  );
}

export default AddVehicle;