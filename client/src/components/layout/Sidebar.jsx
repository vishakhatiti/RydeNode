import React from "react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/customer", label: "Customer Console" },
  { to: "/owner", label: "Owner Fleet" },
  { to: "/driver", label: "Driver Ops" },
  { to: "/request-ride", label: "Request Ride" },
  { to: "/ride-history", label: "Ride History" },
  { to: "/vehicles", label: "Vehicles" }
];

function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-graphite/70 p-4 backdrop-blur-md desktop:block">
      <p className="mb-4 px-2 text-xs uppercase tracking-[0.2em] text-gray-500">Operations</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? "bg-white/10 text-electric-blue" : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
