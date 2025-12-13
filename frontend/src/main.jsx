import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />   {/* ← NO ROUTER HERE */}
  </React.StrictMode>
);
