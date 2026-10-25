import React from "react";

function Footer() {
  return (
    <footer className="mt-20 border-t border-line/15 py-8 text-center text-sm text-subtle">
      © {new Date().getFullYear()} RYDENODE · Tri-Node Premium Mobility Platform
    </footer>
  );
}

export default Footer;
