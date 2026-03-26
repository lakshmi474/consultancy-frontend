import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getApiUrl } from '../../../utils/api';

const AdminTopbar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isBackendLive, setIsBackendLive] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/medicines`); 
        setIsBackendLive(response.ok);
      } catch (error) {
        setIsBackendLive(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 15000); // Check every 15s
    return () => clearInterval(interval);
  }, []);

  const breadcrumb = location.pathname.replace('/admin', '').replace('/', '') || 'dashboard';

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-topbar">
      <div className="breadcrumbs">Admin / {breadcrumb}</div>
      <div className="admin-actions">
        <div className={`backend-status ${isBackendLive ? 'live' : 'offline'}`} title={isBackendLive ? 'API is Connected' : 'API is Offline'}>
          <span className="dot"></span>
          <span className="status-text">{isBackendLive ? 'API Connected' : 'API Offline (Local)'}</span>
        </div>
        <div className="admin-user">
          <span>👤</span>
          <span>{user?.name || 'Admin'}</span>
        </div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
