import React from 'react';
import { mockReports } from './adminMockData';
import './AdminPanel.css';

const AdminReports = () => {
  return (
    <div className="admin-reports">
      <div className="admin-grid">
        <div className="admin-card">
          <h4>Orders today</h4>
          <div className="stat">{mockReports.ordersToday}</div>
        </div>
        <div className="admin-card">
          <h4>Revenue today</h4>
          <div className="stat">₹{mockReports.revenueToday.toLocaleString()}</div>
        </div>
        <div className="admin-card">
          <h4>Revenue this month</h4>
          <div className="stat">₹{mockReports.revenueMonth.toLocaleString()}</div>
        </div>
      </div>

      <div className="admin-card table-card" style={{ marginTop: 16 }}>
        <h4>Best-selling medicines (mock)</h4>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.bestSellers.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.units}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
