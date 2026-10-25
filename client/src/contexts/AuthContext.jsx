import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { UNAUTHORIZED_EVENT, authApi } from "../services/api";

export const AuthContext = createContext(null);

export const ROLE_HOME = {
  customer: "/customer",
  driver: "/driver",
  owner: "/owner",
  admin: "/"
};

const readSavedUser = () => {
  try {
    const saved = localStorage.getItem("ryde_user");
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSavedUser);
  const [checking, setChecking] = useState(() => Boolean(localStorage.getItem("ryde_token")));

  const saveSession = useCallback((data) => {
    localStorage.setItem("ryde_token", data.token);
    localStorage.setItem("ryde_user", JSON.stringify(data));
    setUser(data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ryde_token");
    localStorage.removeItem("ryde_user");
    setUser(null);
  }, []);

  const login = useCallback(
    async (payload) => {
      const { data } = await authApi.login(payload);
      saveSession(data);
      return data;
    },
    [saveSession]
  );

  const register = useCallback(
    async (payload) => {
      const { data } = await authApi.register(payload);
      saveSession(data);
      return data;
    },
    [saveSession]
  );

  // Confirm a saved session is still valid when the app loads.
  useEffect(() => {
    if (!localStorage.getItem("ryde_token")) return;
    authApi
      .me()
      .then(({ data }) => setUser((prev) => ({ ...prev, ...data })))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    window.addEventListener(UNAUTHORIZED_EVENT, logout);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, logout);
  }, [logout]);

  const value = useMemo(
    () => ({ user, checking, login, register, logout }),
    [user, checking, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
