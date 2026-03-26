import React, { useState } from 'react';
import './AdminPanel.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    pharmacyName: 'MediCare Pharmacy',
    license: 'LIC-2026-001',
    deliveryCharge: 49,
    returnPolicy: 'Returns within 7 days for unopened items.',
    adminName: 'Admin User',
    adminEmail: 'admin@medicare.com',
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved (placeholder).');
  };

  return (
    <div className="admin-settings">
      <div className="admin-card">
        <h4>Settings</h4>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Pharmacy details</label>
            <input value={settings.pharmacyName} onChange={(e) => handleChange('pharmacyName', e.target.value)} />
          </div>
          <div className="form-group">
            <label>License info</label>
            <input value={settings.license} onChange={(e) => handleChange('license', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Delivery charges</label>
            <input
              type="number"
              value={settings.deliveryCharge}
              onChange={(e) => handleChange('deliveryCharge', e.target.value)}
            />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Return policy</label>
            <textarea
              rows="3"
              value={settings.returnPolicy}
              onChange={(e) => handleChange('returnPolicy', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Admin name</label>
            <input value={settings.adminName} onChange={(e) => handleChange('adminName', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Admin email</label>
            <input type="email" value={settings.adminEmail} onChange={(e) => handleChange('adminEmail', e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit" style={{ gridColumn: '1 / -1' }}>
            Save settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
