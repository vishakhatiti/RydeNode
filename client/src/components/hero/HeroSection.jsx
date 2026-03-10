import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import HeroBackground from "./HeroBackground";

const Hero3DScene = lazy(() => import("./Hero3DScene"));

function HeroSection() {
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaChange = (event) => {
      setShow3D(event.matches);
    };

    setShow3D(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <section className="relative min-h-[82vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0F0F0F] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
      <HeroBackground />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="rounded-3xl border border-white/15 bg-white/5 p-7 backdrop-blur-lg sm:p-9"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4 inline-flex rounded-full border border-[#2E8BFF]/50 bg-[#2E8BFF]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#9dc5ff]"
          >
            RYDENODE Mobility
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold leading-tight text-white sm:text-5xl"
          >
            Next Generation Ride Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 max-w-xl text-base text-gray-300 sm:text-lg"
          >
            Connecting Customers, Drivers, and Vehicle Owners in one intelligent mobility network.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/register"
              aria-label="Request Ride"
              className="rounded-xl border border-[#2E8BFF]/60 bg-[#2E8BFF]/20 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(46,139,255,0.35)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2E8BFF]/35"
            >
              Request Ride
            </Link>
            <Link
              to="/register"
              aria-label="Become a Driver"
              className="rounded-xl border border-[#8A2BE2]/50 bg-[#8A2BE2]/10 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(138,43,226,0.45)]"
            >
              Become a Driver
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="relative h-[280px] overflow-hidden rounded-3xl border border-white/15 bg-[#1C1C1C]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_70px_rgba(0,0,0,0.45)] sm:h-[360px] lg:h-[520px]"
        >
          {show3D ? (
            <Suspense
              fallback={<div className="h-full w-full animate-pulse bg-gradient-to-br from-[#1C1C1C] via-[#12122B] to-[#0F0F0F]" />}
            >
              <Hero3DScene />
            </Suspense>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(46,139,255,0.35),transparent_40%),radial-gradient(circle_at_75%_70%,rgba(138,43,226,0.45),transparent_45%),#121212]">
              <div className="rounded-2xl border border-white/20 bg-black/30 px-6 py-4 text-center backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-300">Mobile Optimized</p>
                <p className="mt-2 text-xl font-semibold text-white">Premium RYDENODE Experience</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
