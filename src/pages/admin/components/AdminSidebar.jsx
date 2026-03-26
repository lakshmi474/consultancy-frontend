import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/medicines', icon: '💊', label: 'Medicines' },
  { to: '/admin/categories', icon: '🗂️', label: 'Categories' },
  { to: '/admin/orders', icon: '📦', label: 'Orders' },
  { to: '/admin/prescriptions', icon: '📝', label: 'Prescriptions' },
  { to: '/admin/users', icon: '👥', label: 'Users' },
  { to: '/admin/inventory', icon: '📦', label: 'Inventory' },
  { to: '/admin/offers', icon: '🎟️', label: 'Offers & Coupons' },
  { to: '/admin/reports', icon: '📈', label: 'Reports' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
];

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="brand">
        <span>🏥</span>
        <span>MediCare Admin</span>
      </div>
      <nav className="admin-nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
