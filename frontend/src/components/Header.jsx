// frontend/src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";

export default function Header() {
  const [bagCount, setBagCount] = useState(0);

  // 🔁 Update bag count from localStorage
  const updateBagCount = () => {
    const bag = JSON.parse(localStorage.getItem("bag") || "[]");
    const count = bag.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    setBagCount(count);
  };

  useEffect(() => {
    updateBagCount();
    window.addEventListener("storage", updateBagCount);
    return () => window.removeEventListener("storage", updateBagCount);
  }, []);

  return (
    <header>
      <div className="rn-topbar">
        <div className="rn-logo-wrap">
          <Link to="/" className="rn-logo-link">
            <img src={logo} alt="RR Nagar" className="rn-logo" />
            <div className="rn-subtitle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 2 }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#111', lineHeight: 1.1, fontFamily: 'Noto Sans Kannada, sans-serif' }}>
                ತಾಜಾ, ತ್ವರಿತ, ತೃಪ್ತಿಕರ
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#888', marginTop: 2, letterSpacing: '0.02em' }}>
                Fresh. Fast. Fulfillment.
              </span>
            </div>
          </Link>
        </div>
        <nav className="rn-nav">
          <Link className="rn-nav-item" to="/">Home</Link>
          <Link className="rn-nav-item" to="/blog">Blog</Link>
          <Link className="rn-nav-item" to="/login">Login</Link>
          <Link className="rn-nav-item cart-link" to="/bag">
            🛍️ Bag
            {bagCount > 0 && (
              <span className="cart-badge">{bagCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
