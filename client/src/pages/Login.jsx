import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import useAuth from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(form);
    const rolePath = data.role === "driver" ? "/driver" : data.role === "owner" ? "/owner" : "/customer";
    navigate(rolePath);
  };

  return (
    <GlassCard className="mx-auto max-w-md">
      <h1 className="text-2xl font-semibold">Welcome Back</h1>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <input aria-label="Email" className="input" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input aria-label="Password" className="input" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="glow-btn w-full rounded-lg py-2" type="submit">Login</button>
      </form>
    </GlassCard>
  );
}

export default Login;
