import React from "react";
import { Link, NavLink } from "react-router-dom";

import Button from "../ui/Button";

const navLinks = [
  { to: "/customer", label: "Customer" },
  { to: "/driver", label: "Driver" },
  { to: "/owner", label: "Car Owner" },
  { to: "/ride-history", label: "Ride History" }
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 tablet:px-6 desktop:px-8">
        <Link className="text-lg font-bold tracking-wider text-white tablet:text-xl" to="/">
          RYDE<span className="text-electric-blue">NODE</span>
        </Link>

        <ul className="hidden items-center gap-6 desktop:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-electric-blue" : "text-gray-300 hover:text-white"}`
                }
                to={link.to}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 tablet:gap-3">
          <Button as={Link} to="/login" variant="ghost" size="sm">
            Login
          </Button>
          <Button as={Link} to="/register" size="sm">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
