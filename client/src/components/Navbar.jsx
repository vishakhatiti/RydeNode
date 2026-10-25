import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import Button from "./ui/Button";

const LINKS_BY_ROLE = {
  customer: [
    { to: "/customer", label: "Dashboard" },
    { to: "/request-ride", label: "Book Ride" },
    { to: "/ride-history", label: "History" }
  ],
  driver: [{ to: "/driver", label: "Dashboard" }],
  owner: [
    { to: "/owner", label: "Dashboard" },
    { to: "/vehicles", label: "Vehicles" }
  ],
  admin: []
};

function Navbar() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const links = user ? LINKS_BY_ROLE[user.role] || [] : [];

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="text-xl font-bold tracking-wide text-white" to="/">
          RYDE<span className="text-electric-blue">NODE</span>
        </Link>

        <ul className="hidden gap-6 md:flex">
          {links.map((link) => (
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

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-gray-300 sm:inline">
                {user.name} · <span className="capitalize text-electric-blue">{user.role}</span>
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link className="rounded-lg px-4 py-2 text-sm text-gray-300 transition hover:text-white" to="/login">
                Login
              </Link>
              <Link className="glow-btn rounded-lg px-4 py-2 text-sm font-semibold" to="/register">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
