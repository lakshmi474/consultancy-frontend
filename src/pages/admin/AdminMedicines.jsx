import React, { useMemo, useState } from 'react';
import { mockMedicines, mockCategories } from './adminMockData';
import './AdminPanel.css';

const emptyForm = {
  id: '',
  name: '',
  category: '',
  brand: '',
  price: '',
  stock: '',
  prescriptionRequired: false,
  description: '',
  composition: '',
  sideEffects: '',
  available: true,
};

const AdminMedicines = () => {
  const [items, setItems] = useState(mockMedicines);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editingId, setEditingId] = useState(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !filterCategory || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, filterCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.brand) return;
    const payload = {
      ...form,
      id: form.id || `MED-${String(items.length + 1).padStart(3, '0')}`,
      price: Number(form.price || 0),
      stock: Number(form.stock || 0),
    };

    if (editingId) {
      setItems((prev) => prev.map((m) => (m.id === editingId ? payload : m)));
    } else {
      setItems((prev) => [payload, ...prev]);
    }
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const current = items.find((m) => m.id === id);
    if (current) {
      setForm(current);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this medicine?')) {
      setItems((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m)));
  };

  return (
    <div className="admin-medicines">
      <div className="admin-grid">
        <div className="admin-card" style={{ gridColumn: '1 / -1' }}>
          <h4>{editingId ? 'Edit Medicine' : 'Add Medicine'}</h4>
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
                placeholder="Medicine name"
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                required
              >
                <option value="">Select category</option>
                {mockCategories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Brand</label>
              <input
                value={form.brand}
                onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                required
                placeholder="Brand name"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Stock quantity</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Prescription required</label>
              <select
                value={form.prescriptionRequired ? 'yes' : 'no'}
                onChange={(e) => setForm((p) => ({ ...p, prescriptionRequired: e.target.value === 'yes' }))}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <textarea
                rows="2"
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Composition</label>
              <input
                value={form.composition}
                onChange={(e) => setForm((p) => ({ ...p, composition: e.target.value }))}
                placeholder="e.g. Paracetamol 500mg"
              />
            </div>
            <div className="form-group">
              <label>Side effects</label>
              <input
                value={form.sideEffects}
                onChange={(e) => setForm((p) => ({ ...p, sideEffects: e.target.value }))}
                placeholder="Nausea, headache"
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input type="file" disabled />
              <small style={{ color: '#6b7280' }}>Image upload placeholder</small>
            </div>
            <div className="form-group" style={{ alignSelf: 'flex-end' }}>
              <button className="btn btn-primary" type="submit">
                {editingId ? 'Save changes' : 'Add medicine'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
          <input
            placeholder="Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 220, padding: '10px 12px', borderRadius: 10, border: '1px solid #d7deea' }}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #d7deea' }}
          >
            <option value="">All categories</option>
            {mockCategories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rx</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" className="empty-state">
                    No medicines match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.id}</td>
                    <td>{medicine.name}</td>
                    <td>{medicine.brand}</td>
                    <td>{medicine.category}</td>
                    <td>₹{medicine.price}</td>
                    <td>
                      {medicine.stock}{' '}
                      {medicine.stock <= 10 && <span className="status danger">Low</span>}
                    </td>
                    <td>{medicine.prescriptionRequired ? 'Yes' : 'No'}</td>
                    <td>
                      <span className={`status ${medicine.available ? 'success' : 'danger'}`}>
                        {medicine.available ? 'Available' : 'Hidden'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="btn btn-ghost" onClick={() => handleEdit(medicine.id)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(medicine.id)}>
                          Delete
                        </button>
                        <button className="btn btn-primary" onClick={() => toggleAvailability(medicine.id)}>
                          Toggle
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMedicines;
