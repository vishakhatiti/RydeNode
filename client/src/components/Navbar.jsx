import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import Button from "./ui/Button";
import ThemeToggle from "./ui/ThemeToggle";

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
    <header className="sticky top-0 z-50 border-b border-line/15 bg-base/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="text-xl font-bold tracking-wide text-fg" to="/">
          RYDE<span className="text-brand">NODE</span>
        </Link>

        <ul className="hidden gap-6 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-brand" : "text-muted hover:text-fg"}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <span className="hidden text-sm text-muted sm:inline">
                {user.name} · <span className="capitalize text-brand">{user.role}</span>
              </span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link className="rounded-lg px-4 py-2 text-sm text-muted transition hover:text-fg" to="/login">
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
