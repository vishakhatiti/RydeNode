import React from "react";

const variants = {
  primary: "glow-btn",
  ghost: "border border-line/30 bg-surface/60 text-fg hover:border-brand hover:bg-fg/5",
  danger: "bg-danger/90 text-white hover:bg-danger"
};

function Button({ variant = "primary", loading = false, disabled = false, className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
