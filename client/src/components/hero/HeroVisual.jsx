import React from "react";
import { motion } from "framer-motion";

import Icon from "../ui/Icon";

const ROUTE = "M60 330 C 120 330, 120 230, 190 230 S 260 140, 330 140 S 390 90, 420 80";

const floatAnimation = (delay) => ({
  animate: { y: [0, -6, 0] },
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay }
});

function FloatingChip({ className, delay, icon, title, text }) {
  return (
    <motion.div
      {...floatAnimation(delay)}
      className={`absolute flex items-center gap-3 rounded-xl border border-line/25 bg-surface/90 px-3 py-2 shadow-card backdrop-blur ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
        <Icon name={icon} size={16} />
      </span>
      <span className="text-xs leading-tight">
        <span className="block font-semibold text-fg">{title}</span>
        <span className="text-muted">{text}</span>
      </span>
    </motion.div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-lg">
      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-line/25 bg-surface shadow-card">
        <svg viewBox="0 0 480 400" className="h-full w-full" role="img" aria-label="Ride route illustration">
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(var(--c-brand))" />
              <stop offset="100%" stopColor="rgb(var(--c-accent))" />
            </linearGradient>
          </defs>

          <g className="stroke-line/20" strokeWidth="1">
            {[60, 120, 180, 240, 300, 360].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} />
            ))}
            {[80, 160, 240, 320, 400].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" />
            ))}
          </g>
          <rect x="250" y="260" width="110" height="70" rx="12" className="fill-brand/10" />
          <rect x="90" y="70" width="90" height="60" rx="12" className="fill-accent/10" />

          <path d={ROUTE} fill="none" className="stroke-line/30" strokeWidth="10" strokeLinecap="round" />
          <path d={ROUTE} fill="none" stroke="url(#routeGrad)" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 12" />

          <circle cx="60" cy="330" r="9" className="fill-surface stroke-brand" strokeWidth="4" />
          <circle cx="420" cy="80" r="9" className="fill-accent" />
          <circle cx="420" cy="80" r="18" className="fill-accent/20">
            <animate attributeName="r" values="12;24;12" dur="2.4s" repeatCount="indefinite" />
          </circle>

          <g>
            <circle r="13" className="fill-brand" />
            <circle r="5" className="fill-white" />
            <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} />
          </g>
        </svg>
      </div>

      <FloatingChip className="-left-3 top-6 sm:-left-8" delay={0} icon="shield" title="Owner approved" text="Vehicle MH12 AB 1234" />
      <FloatingChip className="-right-2 top-1/2 sm:-right-8" delay={1.2} icon="clock" title="Driver arriving" text="3 min away" />
      <FloatingChip className="bottom-5 left-5" delay={2.2} icon="wallet" title="₹186" text="Fare estimate" />
    </div>
  );
}

export default HeroVisual;
