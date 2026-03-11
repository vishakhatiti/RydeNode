import React from "react";
import { motion } from "framer-motion";

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as: Component = "button",
  ...props
}) {
  const variants = {
    primary: "bg-gradient-to-r from-electric-blue to-neon-purple text-white shadow-glow",
    secondary: "border border-white/20 bg-white/5 text-white hover:bg-white/10",
    ghost: "text-gray-300 hover:bg-white/10 hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm sm:text-base",
    lg: "px-6 py-3 text-base"
  };

  return (
    <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }} className="inline-flex">
      <Component
        className={`rounded-xl font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-electric-blue/70 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}

export default Button;
