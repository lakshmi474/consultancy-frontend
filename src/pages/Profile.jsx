import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Profile Settings</h2>
        <div className="profile-content">
          <p>Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <div className="profile-name-section">
            <h3>{user.name || 'User'}</h3>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h4>Personal Information</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Full Name:</span>
                <span className="detail-value">{user.name || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{user.email || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone Number:</span>
                <span className="detail-value">{user.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4>Delivery Address</h4>
            <div className="detail-grid">
              <div className="detail-item full-width">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{user.address || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">City:</span>
                <span className="detail-value">{user.city || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">State:</span>
                <span className="detail-value">{user.state || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Pincode:</span>
                <span className="detail-value">{user.pincode || 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-primary" disabled>
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


