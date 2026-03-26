import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminPanel.css';

const AdminLogin = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    // Demo admin login placeholder
    if (formData.email === 'admin@medicare.com' && formData.password === 'admin123') {
      login({
        name: 'Admin User',
        email: formData.email,
        role: 'admin',
        id: 'ADMIN-1',
      });
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid admin credentials. Try admin@medicare.com / admin123');
    }
  };

  return (
    <div className="auth-page">
      <div className="container" style={{ maxWidth: '520px' }}>
        <div className="admin-card">
          <h2>Admin Sign In</h2>
          <p style={{ color: '#4b5d73', marginBottom: 12 }}>
            Secure access for pharmacy administrators
          </p>
          <form onSubmit={handleSubmit} className="form-grid">
            {error && (
              <div className="status danger" style={{ width: '100%', justifyContent: 'center' }}>
                {error}
              </div>
            )}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="admin@medicare.com"
                required
              />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                required
              />
            </div>
            <button className="btn btn-primary" type="submit" style={{ gridColumn: '1 / -1' }}>
              Sign in to Admin
            </button>
          </form>
          <p style={{ marginTop: 12, color: '#6b7280', fontWeight: 600 }}>
            Demo credentials: admin@medicare.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
