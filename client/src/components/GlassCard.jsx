import React from "react";
import { motion } from "framer-motion";

function GlassCard({ children, className = "", as: Component = "div" }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={`rounded-2xl border border-white/20 bg-white/10 p-5 shadow-[0_0_35px_rgba(46,139,255,0.12)] backdrop-blur-xl ${className}`}
    >
      <Component>{children}</Component>
    </motion.div>
  );
}

export default GlassCard;
