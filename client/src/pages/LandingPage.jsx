import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import GlassCard from "../components/GlassCard";
import HeroSection from "../components/hero/HeroSection";
import Icon from "../components/ui/Icon";

const steps = [
  { icon: "pin", title: "Customer requests", text: "Pick a pickup and destination and see the fare before you confirm." },
  { icon: "key", title: "Owner approves", text: "A car owner assigns an available vehicle to the trip." },
  { icon: "user", title: "Driver accepts", text: "A verified driver takes the ride and heads to the pickup." },
  { icon: "route", title: "Ride and track", text: "Follow the trip live from pickup to drop-off." }
];

const roles = [
  {
    icon: "user",
    title: "Customers",
    points: ["Book a ride in a few taps", "Track your driver live", "See your full ride history"]
  },
  {
    icon: "car",
    title: "Drivers",
    points: ["Drive without owning a car", "Pick up approved rides near you", "Track your earnings"]
  },
  {
    icon: "key",
    title: "Car owners",
    points: ["List idle vehicles", "Approve which rides use your car", "Monitor utilisation and income"]
  }
];

const features = [
  { icon: "shield", title: "Role-based access", text: "Every user sees only what their role needs." },
  { icon: "bolt", title: "Live updates", text: "Ride status and driver location in real time." },
  { icon: "wallet", title: "Transparent fares", text: "Know the price before you book." },
  { icon: "chart", title: "Owner insights", text: "See how each vehicle performs." },
  { icon: "clock", title: "Shift flexibility", text: "Drivers choose when they go online." },
  { icon: "list", title: "Full history", text: "Every ride, saved and searchable." }
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

function IconBadge({ name }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/25 to-accent/25 text-brand">
      <Icon name={name} size={22} />
    </span>
  );
}

function LandingPage() {
  return (
    <div className="space-y-24">
      <HeroSection />

      <motion.section {...reveal} className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">How RydeNode works</h2>
          <p className="mt-2 text-muted">Four steps from request to ride.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <GlassCard key={step.title} className="relative h-full">
              <span className="absolute right-4 top-3 text-4xl font-black text-fg/5">{index + 1}</span>
              <IconBadge name={step.icon} />
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.text}</p>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      <motion.section {...reveal} className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">One platform, three ways to earn and ride</h2>
          <p className="mt-2 text-muted">Choose your role when you sign up.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {roles.map((role) => (
            <GlassCard key={role.title} className="h-full">
              <IconBadge name={role.icon} />
              <h3 className="mt-4 text-xl font-semibold">{role.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {role.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-success" />
                    {point}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      <motion.section {...reveal} className="space-y-8">
        <h2 className="text-center text-3xl font-bold">Built to be reliable</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-2xl border border-line/15 p-5 transition hover:border-brand/40 hover:bg-surface/60"
            >
              <span className="mt-0.5 text-brand">
                <Icon name={feature.icon} size={22} />
              </span>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...reveal}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand to-accent p-10 text-center text-white shadow-glow sm:p-14"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to take the first ride?</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">Create a free account as a customer, driver or car owner.</p>
        <Link
          to="/register"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Create your account <Icon name="arrow" size={18} />
        </Link>
      </motion.section>
    </div>
  );
}

export default LandingPage;
