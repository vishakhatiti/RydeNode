import React, { createContext, useCallback, useMemo, useState } from "react";

export const ToastContext = createContext(null);

const TOAST_MS = 3500;

const styles = {
  success: "border-success/60 text-success",
  error: "border-danger/60 text-danger",
  info: "border-brand/60 text-brand"
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type, message) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => dismiss(id), TOAST_MS);
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      success: (m) => push("success", m),
      error: (m) => push("error", m),
      info: (m) => push("info", m)
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[200] flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            className={`pointer-events-auto animate-toast-in rounded-xl border bg-surface/95 px-4 py-3 text-left text-sm shadow-lg backdrop-blur ${styles[t.type]}`}
          >
            {t.message}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
