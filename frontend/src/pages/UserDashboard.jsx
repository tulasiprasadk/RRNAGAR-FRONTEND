import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [stats, setStats] = useState({
    orders: 0,
    saved: 0,
    addresses: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const reqConfig = { withCredentials: true };

    try {
      const profileRes = await axios.get("/api/customer/profile", reqConfig);
      setProfile(profileRes.data);
    } catch (err) {
      console.log("Dashboard profile load error:", err);
      return;
    }

    const [statsRes, ordersRes, addressRes] = await Promise.all([
      axios
        .get("/api/customer/dashboard-stats", reqConfig)
        .catch((err) => {
          console.warn("Dashboard stats load error:", err);
          return { data: { orders: 0, saved: 0, addresses: 0 } };
        }),
      axios
        .get("/api/orders", reqConfig)
        .catch((err) => {
          console.warn("Dashboard orders load error:", err);
          return { data: [] };
        }),
      axios
        .get("/api/customer/address", reqConfig)
        .catch((err) => {
          console.warn("Dashboard address load error:", err);
          return { data: [] };
        })
    ]);

    setStats(statsRes.data || { orders: 0, saved: 0, addresses: 0 });
    setOrders((ordersRes.data || []).slice(0, 5));
    setAddresses(addressRes.data || []);
  }

  if (!profile) return <p className="loading">Loading dashboard...</p>;

  return (
    <div className="dash-container">

      {/* WELCOME BOX */}
      <div className="dash-welcome">
        <h2 className="welcome-name">👋 Welcome, {profile.name || "Customer"}</h2>
        <p className="welcome-phone">Mobile: {profile.mobile}</p>
      </div>

      {/* 3 MAIN STAT CARDS */}
      <div className="dash-cards">

        <div className="dash-card" onClick={() => navigate("/my-orders")}>
          <div className="card-number">{stats.orders}</div>
          <div className="card-label">My Orders</div>
        </div>

        <div className="dash-card" onClick={() => navigate("/saved-suppliers")}>
          <div className="card-number">{stats.saved}</div>
          <div className="card-label">Saved Shops</div>
        </div>

        <div className="dash-card" onClick={() => navigate("/address")}>
          <div className="card-number">{stats.addresses}</div>
          <div className="card-label">Addresses</div>
        </div>

      </div>

      {/* RECENT ORDERS SECTION */}
      <div className="dash-section">
        <div className="section-header">
          <h3>Recent Orders</h3>
          <button onClick={() => navigate("/my-orders")} className="view-all-btn">View All</button>
        </div>
        {orders.length === 0 ? (
          <p className="empty-message">No orders yet</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-item">
                <div className="order-info">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="order-details">
                  <span className="order-amount">₹{order.totalAmount}</span>
                  <span className={`order-status status-${order.status}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADDRESSES SECTION */}
      <div className="dash-section">
        <div className="section-header">
          <h3>My Addresses</h3>
          <button onClick={() => navigate("/address")} className="view-all-btn">Manage</button>
        </div>
        {addresses.length === 0 ? (
          <p className="empty-message">No addresses saved</p>
        ) : (
          <div className="addresses-list">
            {addresses.slice(0, 3).map(addr => (
              <div key={addr.id} className="address-item">
                <div className="address-label">{addr.label || "Home"}</div>
                <div className="address-text">{addr.addressLine}</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
