import React from "react";

function Input({ label, error, className = "", ...props }) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm text-gray-300">{label}</span> : null}
      <input
        className={`w-full rounded-xl border border-white/20 bg-graphite px-4 py-2.5 text-white outline-none transition placeholder:text-gray-500 focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/30 ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  );
}

export default Input;
