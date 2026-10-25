import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import GlassCard from "../components/GlassCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { ROLE_HOME } from "../contexts/AuthContext";
import { getErrorMessage } from "../services/api";

const ROLES = [
  { value: "customer", label: "Customer: book rides" },
  { value: "driver", label: "Driver: accept and drive rides" },
  { value: "owner", label: "Car Owner: list vehicles" }
];

function Register() {
  const { user, register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to={ROLE_HOME[user.role] || "/"} replace />;
  }

  const update = (field) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name";
    if (form.password.length < 6) next.password = "Use at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await register(form);
      toast.success("Account created. Welcome to RydeNode!");
      navigate(ROLE_HOME[data.role] || "/", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="mx-auto max-w-md animate-fade-up">
      <h1 className="text-2xl font-semibold">Create Your Account</h1>
      <p className="mt-1 text-sm text-gray-400">Pick your role to get started.</p>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <Input label="Full name" required autoComplete="name" value={form.name} onChange={update("name")} error={errors.name} />
        <Input label="Email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} />
        <Input label="Password" type="password" required autoComplete="new-password" value={form.password} onChange={update("password")} error={errors.password} />
        <Input label="I want to join as" as="select" value={form.role} onChange={update("role")}>
          {ROLES.map((role) => (
            <option key={role.value} value={role.value} className="bg-graphite">
              {role.label}
            </option>
          ))}
        </Input>
        <Button className="w-full" type="submit" loading={loading}>
          {loading ? "Creating account…" : "Register"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-400">
        Already registered?{" "}
        <Link className="text-electric-blue transition hover:underline" to="/login">
          Log in
        </Link>
      </p>
    </GlassCard>
  );
}

export default Register;
