import React from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion } from "framer-motion";

import GlassCard from "../components/GlassCard";

function CarVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />
      <Float speed={2} rotationIntensity={0.5}>
        <mesh>
          <boxGeometry args={[2, 0.7, 1]} />
          <meshStandardMaterial color="#2E8BFF" emissive="#8A2BE2" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1, 0.4, 0.9]} />
          <meshStandardMaterial color="#1C1C1C" />
        </mesh>
      </Float>
    </Canvas>
  );
}

const roles = [
  { title: "Customer", desc: "Request instant premium rides and track drivers live." },
  { title: "Driver", desc: "Accept verified rides, navigate smoothly, and optimize shift income." },
  { title: "Owner", desc: "Monetize vehicles with analytics, approvals, and availability controls." }
];

function LandingPage() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-graphite via-midnight to-[#14142A] p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,139,255,0.25),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(138,43,226,0.3),transparent_35%)]" />
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">Luxury Mobility for the Tri-Node Economy</h1>
            <p className="mt-4 max-w-lg text-gray-300">
              RYDENODE connects Customers, Drivers, and Car Owners in one premium, real-time platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="glow-btn rounded-xl px-5 py-3 font-semibold" to="/register">
                Launch Dashboard
              </Link>
              <Link className="rounded-xl border border-white/20 px-5 py-3 text-gray-200" to="/login">
                Sign In
              </Link>
            </div>
          </motion.div>
          <div className="h-72 rounded-2xl border border-white/10 bg-black/30">
            <CarVisual />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">How RYDENODE Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => (
            <GlassCard key={role.title}>
              <h3 className="text-xl font-semibold text-white">{role.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{role.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-electric-blue/40 bg-electric-blue/10 p-8 text-center">
        <h3 className="text-2xl font-semibold">Ready to transform ride logistics?</h3>
        <p className="mt-2 text-gray-300">Experience real-time operations with premium UX and intelligent orchestration.</p>
      </section>
    </div>
  );
}

export default LandingPage;
