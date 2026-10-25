import React from "react";
import { motion } from "framer-motion";

function GlassCard({ children, className = "", as: Component = "div" }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className={`rounded-2xl border border-line/20 bg-surface/80 p-5 shadow-card backdrop-blur-xl transition-colors hover:border-brand/40 ${className}`}
    >
      <Component>{children}</Component>
    </motion.div>
  );
}

export default GlassCard;
