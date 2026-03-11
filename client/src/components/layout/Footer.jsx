import React from "react";

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-gray-400 tablet:text-sm">
      © {new Date().getFullYear()} RYDENODE · Premium tri-node mobility ecosystem
    </footer>
  );
}

export default Footer;
