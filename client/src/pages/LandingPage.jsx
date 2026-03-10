import React from "react";

import GlassCard from "../components/GlassCard";
import HeroSection from "../components/hero/HeroSection";

const roles = [
  { title: "Customer", desc: "Request instant premium rides and track drivers live." },
  { title: "Driver", desc: "Accept verified rides, navigate smoothly, and optimize shift income." },
  { title: "Owner", desc: "Monetize vehicles with analytics, approvals, and availability controls." }
];

function LandingPage() {
  return (
    <div className="space-y-16">
      <HeroSection />

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
