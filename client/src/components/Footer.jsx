import React from "react";

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} RYDENODE · Tri-Node Premium Mobility Platform
    </footer>
  );
}

export default Footer;
