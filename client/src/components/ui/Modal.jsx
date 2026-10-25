import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="w-full max-w-md rounded-2xl border border-line/25 bg-surface p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && <h2 className="mb-3 text-xl font-semibold text-fg">{title}</h2>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
