import React, { useState } from 'react';
import { mockCategories } from './adminMockData';
import './AdminPanel.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    if (editingId) {
      setCategories((prev) => prev.map((c) => (c.id === editingId ? { ...c, name } : c)));
    } else {
      setCategories((prev) => [...prev, { id: `CAT-${prev.length + 1}`, name, products: 0 }]);
    }
    setName('');
    setEditingId(null);
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this category?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="admin-categories">
      <div className="admin-card">
        <h4>{editingId ? 'Edit category' : 'Add category'}</h4>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Category name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Diabetes care" />
          </div>
          <button className="btn btn-primary" type="submit" style={{ gridColumn: '1 / -1' }}>
            {editingId ? 'Save changes' : 'Add category'}
          </button>
        </form>
      </div>

      <div className="admin-card" style={{ marginTop: 16 }}>
        <h4>Categories</h4>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.products}</td>
                  <td className="table-actions">
                    <button className="btn btn-ghost" onClick={() => handleEdit(cat)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(cat.id)}>
                      Delete
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

export default AdminCategories;
