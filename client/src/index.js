import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./contexts/AuthContext";
import { RideProvider } from "./contexts/RideContext";
import { ToastProvider } from "./contexts/ToastContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <RideProvider>
            <App />
          </RideProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
