import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext(null);

const STORAGE_KEY = "ryde_theme";

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (error) {
    // storage unavailable: fall through to the system preference
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
