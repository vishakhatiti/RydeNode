import React from "react";

function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[#0B1022]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.24),transparent_42%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.2),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(99,102,241,0.1),transparent_45%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:42px_42px]" />
    </>
  );
}

export default HeroBackground;
