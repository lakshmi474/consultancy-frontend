import React from 'react';
import { Link } from 'react-router-dom';
import MedicineCard from '../components/MedicineCard';
import './Wishlist.css';

const Wishlist = () => {
  // In a real app, this would come from user's wishlist
  const wishlist = [];

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <h2>My Wishlist</h2>
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <Link to="/medicines" className="btn btn-primary">
            Browse Medicines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      <div className="wishlist-grid">
        {wishlist.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;


