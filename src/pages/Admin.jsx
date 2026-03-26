import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './admin/components/AdminSidebar';
import AdminTopbar from './admin/components/AdminTopbar';
import './admin/AdminPanel.css';

const Admin = () => {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar currentPath={location.pathname} />
      <div className="admin-main">
        <AdminTopbar user={user} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
