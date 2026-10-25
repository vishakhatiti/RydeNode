import React from "react";

function DriverLocationMarker() {
  return (
    <div className="relative h-5 w-5" aria-label="Driver live location marker">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
      <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-white bg-brand" />
    </div>
  );
}

export default DriverLocationMarker;
