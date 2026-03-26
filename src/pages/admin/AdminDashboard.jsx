import React from 'react';
import { mockMedicines, mockReports } from './adminMockData';
import './AdminPanel.css';

const AdminDashboard = () => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const prescriptionStatuses = JSON.parse(
    localStorage.getItem('prescriptionStatuses') || '{}'
  );
  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total || 0),
    0
  );
  const todayRevenue = orders
    .filter((o) => new Date(o.orderDate).toDateString() === new Date().toDateString())
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const lowStock = mockMedicines.filter((m) => m.stock <= 20);
  const pendingPrescriptions = orders.filter(
    (o) =>
      Array.isArray(o.prescriptionFiles) &&
      o.prescriptionFiles.length > 0 &&
      (prescriptionStatuses[o.orderId] || 'Pending') === 'Pending'
  );

  const summary = [
    { title: 'Total Medicines', value: mockMedicines.length, chip: '+6 this week' },
    { title: 'Total Orders', value: orders.length, chip: 'Live' },
    { title: 'Pending Prescriptions', value: pendingPrescriptions.length, chip: 'Review now' },
    { title: 'Low Stock Alerts', value: lowStock.length, chip: 'Restock' },
    { title: "Today's Revenue", value: `₹${todayRevenue.toLocaleString()}`, chip: 'Live' },
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, chip: 'Live' },
  ];

  const recentOrders = [...orders].reverse().slice(0, 4);

  return (
    <div className="admin-dashboard">
      <div className="admin-grid">
        {summary.map((item) => (
          <div className="admin-card" key={item.title}>
            <h4>{item.title}</h4>
            <div className="stat">{item.value}</div>
            <div className="chip">{item.chip}</div>
          </div>
        ))}
      </div>

      <div className="admin-grid" style={{ marginTop: 20 }}>
        <div className="admin-card table-card">
          <h4>Recent Orders</h4>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const isDelivered = order.status === 'Delivered';
                  return (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.name}</td>
                      <td>₹{Number(order.total || 0).toFixed(2)}</td>
                      <td>
                        <span className={`status ${isDelivered ? 'success' : 'info'}`}>
                          {order.status || 'Ready'}
                        </span>
                      </td>
                      <td>
                        {order.paymentStatus ||
                          (order.paymentMethod === 'cod' ? 'Pending' : 'Paid')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card table-card">
          <h4>Low Stock Medicines</h4>
          {lowStock.length === 0 ? (
            <div className="empty-state">All medicines are in stock</div>
          ) : (
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.map((medicine) => (
                    <tr key={medicine.id}>
                      <td>{medicine.name}</td>
                      <td className="low-stock">{medicine.stock} units</td>
                      <td>
                        <button className="btn btn-primary">Restock</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
