import React, { useEffect, useState } from "react";
import axios from "axios";
import SupplierForm from "./SupplierForm";

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  function fetchSuppliers() {
    setLoading(true);
    axios.get("/api/admin/suppliers").then(res => setSuppliers(res.data)).finally(() => setLoading(false));
  }

  function handleApprove(id) {
    axios.patch(`/api/admin/suppliers/${id}/status`, { status: "approved" }).then(fetchSuppliers);
  }
  function handleBlock(id) {
    axios.patch(`/api/admin/suppliers/${id}/status`, { status: "blocked" }).then(fetchSuppliers);
  }
  function handleDelete(id) {
    if (!window.confirm("Delete this supplier?")) return;
    axios.delete(`/api/admin/suppliers/${id}`).then(fetchSuppliers);
  }
  function handleEdit(supplier) {
    setEditing(supplier);
    setShowForm(true);
  }
  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }
  function handleFormSuccess() {
    setShowForm(false);
    setEditing(null);
    fetchSuppliers();
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Supplier Management</h2>
      <button onClick={handleAdd} style={{ marginBottom: 16 }}>Add Supplier</button>
      {showForm && (
        <SupplierForm supplier={editing} onSuccess={handleFormSuccess} />
      )}
      {loading && <div>Loading...</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Status</th><th>Contact</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.status}</td>
              <td>{s.contact}</td>
              <td>
                {s.status !== "approved" && (
                  <button onClick={() => handleApprove(s.id)}>Approve</button>
                )}
                {s.status !== "blocked" && (
                  <button onClick={() => handleBlock(s.id)}>Block</button>
                )}
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
