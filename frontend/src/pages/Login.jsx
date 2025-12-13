// frontend/src/pages/Login.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      await axios.post("/api/auth/request-otp", { phone }, { withCredentials: true });

      // Move to OTP verification page
      navigate("/verify", { state: { phone } });

    } catch (err) {
      console.error("OTP Request Error:", err);
      const msg = err?.response?.data?.error || err?.message || "Unable to send OTP, please try again.";
      alert(msg);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Login</h2>

      <input
        type="text"
        value={phone}
        placeholder="Enter phone number"
        onChange={(e) => setPhone(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          marginTop: "10px",
          display: "block",
        }}
      />

      <button
        onClick={requestOtp}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Get OTP
      </button>
    </div>
  );
}
