import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function Notification({ message, type = "info", isOpen }) {
  const tones = {
    info: "border-electric-blue/40",
    success: "border-emerald-400/40",
    error: "border-red-400/40"
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={`fixed right-4 top-4 z-[110] rounded-xl border bg-graphite/95 px-4 py-3 text-sm text-white shadow-xl ${tones[type]}`}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Notification;
