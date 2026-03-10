import React, { useState } from "react";
import API from "../services/api";

function Register() {

  const [form, setForm] = useState({
    name:"",
    email:"",
    password:"",
    role:"customer"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/register", form);

    alert("User created");
    console.log(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>

      <input placeholder="Name"
      onChange={e=>setForm({...form,name:e.target.value})} />

      <input placeholder="Email"
      onChange={e=>setForm({...form,email:e.target.value})} />

      <input placeholder="Password"
      type="password"
      onChange={e=>setForm({...form,password:e.target.value})} />

      <select
      onChange={e=>setForm({...form,role:e.target.value})}>

        <option value="customer">Customer</option>
        <option value="driver">Driver</option>
        <option value="owner">Owner</option>

      </select>

      <button>Register</button>

    </form>
  );
}

export default Register;