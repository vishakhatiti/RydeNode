import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./contexts/AuthContext";
import { RideProvider } from "./contexts/RideContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RideProvider>
        <App />
      </RideProvider>
    </AuthProvider>
  </React.StrictMode>
);
