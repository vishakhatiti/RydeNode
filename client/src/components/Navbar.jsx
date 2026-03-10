import React from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/customer", label: "Customer" },
  { to: "/driver", label: "Driver" },
  { to: "/owner", label: "Owner" },
  { to: "/ride-history", label: "History" }
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link className="text-xl font-bold tracking-wide text-white" to="/">
          RYDE<span className="text-electric-blue">NODE</span>
        </Link>

        <ul className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-electric-blue" : "text-gray-300 hover:text-white"}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <Link className="rounded-lg px-4 py-2 text-sm text-gray-300 hover:text-white" to="/login">
            Login
          </Link>
          <Link className="glow-btn rounded-lg px-4 py-2 text-sm font-semibold" to="/register">
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
