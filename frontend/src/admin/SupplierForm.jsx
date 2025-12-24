import React, { useState } from "react";
import axios from "axios";

export default function SupplierForm({ onSuccess, supplier }) {
  const [form, setForm] = useState(
    supplier || { name: "", contact: "", address: "", status: "approved" }
  );
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const req = supplier
      ? axios.put(`/api/admin/suppliers/${supplier.id}`, form)
      : axios.post("/api/admin/suppliers", form);
    req.then(() => {
      setLoading(false);
      onSuccess && onSuccess();
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Supplier Name"
        required
      />
      <input
        name="contact"
        value={form.contact}
        onChange={handleChange}
        placeholder="Contact"
        required
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="approved">Approved</option>
        <option value="blocked">Blocked</option>
      </select>
      <button type="submit" disabled={loading}>
        {supplier ? "Update" : "Add"} Supplier
      </button>
    </form>
  );
}
