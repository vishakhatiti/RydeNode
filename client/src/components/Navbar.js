import React from "react";

function Navbar() {
  return (
    <div style={{padding:20, background:"#eee"}}>
      <a href="/">Home</a> |
      <a href="/login"> Login</a> |
      <a href="/register"> Register</a> |
      <a href="/request-ride"> Request Ride</a> |
      <a href="/add-vehicle"> Add Vehicle</a>
    </div>
  );
}

export default Navbar;