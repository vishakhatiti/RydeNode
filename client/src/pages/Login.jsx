import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import GlassCard from "../components/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { ROLE_HOME } from "../contexts/AuthContext";
import { getErrorMessage } from "../services/api";

function Login() {
  const { user, login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to={ROLE_HOME[user.role] || "/"} replace />;
  }

  const update = (field) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form);
      toast.success(`Welcome back, ${data.name}!`);
      navigate(location.state?.from || ROLE_HOME[data.role] || "/", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="mx-auto max-w-md animate-fade-up">
      <h1 className="text-2xl font-semibold">Welcome Back</h1>
      <p className="mt-1 text-sm text-gray-400">Log in to continue your journey.</p>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} />
        <Input label="Password" type="password" required autoComplete="current-password" value={form.password} onChange={update("password")} />
        <Button className="w-full" type="submit" loading={loading}>
          {loading ? "Logging in…" : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        New here?{" "}
        <Link className="text-electric-blue transition hover:underline" to="/register">
          Create an account
        </Link>
      </p>
    </GlassCard>
  );
}

export default Login;
