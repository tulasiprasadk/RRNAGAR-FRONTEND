import React from "react";

export default function AdminDashboard() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Admin Dashboard</h1>
      <ul style={{ fontSize: 18, marginTop: 24 }}>
        <li>Manage Users</li>
        <li>Manage Suppliers</li>
        <li>Manage Products</li>
        <li>Manage Blogs</li>
        <li>Manage Payments</li>
        <li>Manage QR Codes</li>
        <li>Manage Categories</li>
        <li>Manage Advertisements</li>
        <li>Reports</li>
      </ul>
      <p style={{ color: '#888', marginTop: 32 }}>
        Select a section to begin managing your platform.
      </p>
    </div>
  );
}
