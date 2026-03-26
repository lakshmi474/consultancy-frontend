import React, { useState } from 'react';
import { mockMedicines } from './adminMockData';
import './AdminPanel.css';

const AdminInventory = () => {
  const [items, setItems] = useState(mockMedicines);

  const updateStock = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  return (
    <div className="admin-inventory">
      <div className="admin-card">
        <h4>Inventory / Stock</h4>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Stock</th>
                <th>Rx</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    {item.stock}{' '}
                    {item.stock <= 10 && <span className="status warning">Low</span>}{' '}
                    {item.stock === 0 && <span className="status danger">Out</span>}
                  </td>
                  <td>{item.prescriptionRequired ? 'Yes' : 'No'}</td>
                  <td>
                    <span className={`status ${item.available ? 'success' : 'danger'}`}>
                      {item.available ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button className="btn btn-primary" onClick={() => updateStock(item.id, 10)}>
                      +10
                    </button>
                    <button className="btn btn-ghost" onClick={() => updateStock(item.id, -5)}>
                      -5
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

export default AdminInventory;
