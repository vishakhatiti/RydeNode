import React from "react";

function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-300">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-electric-blue/30 border-t-electric-blue" />
      {label}
    </div>
  );
}

export default Loader;
