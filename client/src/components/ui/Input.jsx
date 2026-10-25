import React, { useId } from "react";

function Input({ label, error, className = "", children, as: Tag = "input", ...props }) {
  const id = useId();

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm text-muted">
          {label}
        </label>
      )}
      <Tag
        id={id}
        className={`input ${error ? "!border-danger" : ""} ${className}`}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {children}
      </Tag>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

export default Input;
