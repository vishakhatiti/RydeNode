import React, { createContext, useMemo, useState } from "react";
import { authApi } from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("ryde_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (payload) => {
    const { data } = await authApi.login(payload);
    localStorage.setItem("ryde_token", data.token);
    localStorage.setItem("ryde_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await authApi.register(payload);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("ryde_token");
    localStorage.removeItem("ryde_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
