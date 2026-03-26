import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './MedicineCard.css';

const MedicineCard = ({ medicine }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(medicine, 1);
  };

  return (
    <Link
      to={`/medicine/${medicine.id}`}
      className="medicine-card"
      data-scroll
      data-animation="zoom-in"
    >
      <div className="medicine-image-wrapper">
        {medicine.discount > 0 && (
          <span className="discount-badge">-{medicine.discount}%</span>
        )}
        {medicine.prescriptionRequired && (
          <span className="prescription-badge">Rx Required</span>
        )}
        <img
          src={medicine.image}
          alt={medicine.name}
          className="medicine-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop';
          }}
        />
      </div>
      <div className="medicine-info">
        <h3 className="medicine-name">{medicine.name}</h3>
        <p className="medicine-brand">{medicine.brand}</p>
        <div className="medicine-category">{medicine.category}</div>
        <div className="medicine-price">
          <span className="current-price">₹{medicine.price}</span>
          {medicine.originalPrice > medicine.price && (
            <span className="original-price">₹{medicine.originalPrice}</span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="add-to-cart-btn"
          aria-label={`Add ${medicine.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default MedicineCard;


