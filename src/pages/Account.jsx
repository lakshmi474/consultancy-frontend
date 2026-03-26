import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Account.css';

const Account = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="account-page">
      <div className="container">
        <h1 className="account-title">My Account</h1>
        <div className="account-content">
          <aside className="account-sidebar">
            <div className="account-user">
              <div className="user-avatar">👤</div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <nav className="account-nav">
              <Link to="/account/orders" className="nav-link">
                📦 My Orders
              </Link>
              <Link to="/account/addresses" className="nav-link">
                📍 Saved Addresses
              </Link>
              <Link to="/account/prescriptions" className="nav-link">
                📄 Prescription History
              </Link>
              <Link to="/account/wishlist" className="nav-link">
                ❤️ Wishlist
              </Link>
              <Link to="/account/profile" className="nav-link">
                ⚙️ Profile Settings
              </Link>
            </nav>
          </aside>
          <main className="account-main">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;


