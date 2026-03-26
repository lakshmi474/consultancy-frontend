import React, { useState } from 'react';
import { mockCoupons } from './adminMockData';
import './AdminPanel.css';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [form, setForm] = useState({ code: '', discount: 0, expiry: '', active: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.code || !form.expiry) return;
    setCoupons((prev) => [form, ...prev]);
    setForm({ code: '', discount: 0, expiry: '', active: true });
  };

  const toggleActive = (code) => {
    setCoupons((prev) => prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c)));
  };

  return (
    <div className="admin-coupons">
      <div className="admin-card">
        <h4>Create coupon</h4>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Code</label>
            <input value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))} required />
          </div>
          <div className="form-group">
            <label>Discount %</label>
            <input
              type="number"
              value={form.discount}
              onChange={(e) => setForm((p) => ({ ...p, discount: Number(e.target.value) }))}
              min="0"
              max="90"
              required
            />
          </div>
          <div className="form-group">
            <label>Expiry date</label>
            <input
              type="date"
              value={form.expiry}
              onChange={(e) => setForm((p) => ({ ...p, expiry: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={form.active ? 'active' : 'inactive'}
              onChange={(e) => setForm((p) => ({ ...p, active: e.target.value === 'active' }))}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit" style={{ gridColumn: '1 / -1' }}>
            Save coupon
          </button>
        </form>
      </div>

      <div className="admin-card" style={{ marginTop: 16 }}>
        <h4>Offers & Coupons</h4>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.code}>
                  <td>{coupon.code}</td>
                  <td>{coupon.discount}%</td>
                  <td>{coupon.expiry}</td>
                  <td>
                    <span className={`status ${coupon.active ? 'success' : 'danger'}`}>
                      {coupon.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost" onClick={() => toggleActive(coupon.code)}>
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;
