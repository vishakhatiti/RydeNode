import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import useAuth from "../hooks/useAuth";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  return (
    <GlassCard className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Create Premium Account</h1>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <input className="input" placeholder="Full Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" type="email" placeholder="Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
          <option value="owner">Owner</option>
        </select>
        <button className="glow-btn w-full rounded-lg py-2" type="submit">Register</button>
      </form>
    </GlassCard>
  );
}

export default Register;
