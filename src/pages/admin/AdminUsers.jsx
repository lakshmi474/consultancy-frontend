import React, { useEffect, useState } from 'react';
import { mockOrders } from './adminMockData';
import './AdminPanel.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(stored);
  }, []);

  const toggleBlock = (id) => {
    setUsers((prev) => {
      const updated = prev.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u));
      localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="admin-users">
      <div className="admin-card">
        <h4>Registered users</h4>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No registered users yet.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                    <td>{user.totalOrders || 0}</td>
                  <td>
                    <span className={`status ${user.blocked ? 'danger' : 'success'}`}>
                      {user.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button className="btn btn-ghost" onClick={() => setSelectedUser(user)}>
                      History
                    </button>
                    <button className="btn btn-danger" onClick={() => toggleBlock(user.id)}>
                      {user.blocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="admin-card" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>{selectedUser.name} - Order history</h4>
            <button className="btn btn-ghost" onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>
          <div className="table-wrapper" style={{ marginTop: 12 }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(0, 3).map((o) => (
                  <tr key={o.orderId}>
                    <td>{o.orderId}</td>
                    <td>₹{o.amount}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
