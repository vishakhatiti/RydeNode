import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import HeroVisual from "./HeroVisual";
import Icon from "../ui/Icon";

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" }
});

function HeroSection() {
  return (
    <section className="grid items-center gap-12 py-6 lg:grid-cols-2 lg:py-12">
      <div>
        <motion.span
          {...rise(0)}
          className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Tri-node mobility
        </motion.span>

        <motion.h1 {...rise(0.1)} className="mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
          Rides powered by{" "}
          <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">people and their cars</span>
        </motion.h1>

        <motion.p {...rise(0.2)} className="mt-5 max-w-xl text-base text-muted sm:text-lg">
          RydeNode connects customers, car owners and drivers in one network. Owners earn from idle vehicles, drivers work without
          buying a car, and riders get a trusted trip.
        </motion.p>

        <motion.div {...rise(0.3)} className="mt-8 flex flex-wrap gap-4">
          <Link to="/register" className="glow-btn inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold">
            Get started <Icon name="arrow" size={18} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center rounded-xl border border-line/30 bg-surface/60 px-6 py-3 font-semibold text-fg transition hover:-translate-y-0.5 hover:border-brand"
          >
            I already have an account
          </Link>
        </motion.div>

        <motion.ul {...rise(0.4)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {["Open sign-up in minutes", "Owner-approved vehicles", "Live ride tracking"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Icon name="check" size={16} className="text-success" />
              {item}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <HeroVisual />
      </motion.div>
    </section>
  );
}

export default HeroSection;
