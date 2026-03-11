import React from "react";

function GlassCard({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-white/15 bg-white/5 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default GlassCard;
