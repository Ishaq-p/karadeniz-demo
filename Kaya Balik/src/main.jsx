/**
 * Uygulama giriş noktası.
 * React bileşenini DOM'a bağlar.
 */
import "./storage-shim.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../kaya-balik-karadeniz-light.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
