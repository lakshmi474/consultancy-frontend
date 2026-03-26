import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './MedicineDetail.css';

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [medicine, setMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const loadMedicine = async () => {
      const medicinesData = await import('../data/medicines.json');
      const found = medicinesData.default.find((med) => med.id === parseInt(id));
      setMedicine(found);
      setLoading(false);
    };
    loadMedicine();
  }, [id]);

  const handleAddToCart = () => {
    if (medicine) {
      addToCart(medicine, quantity);
      alert(`${quantity} ${medicine.name} added to cart!`);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (loading) {
    return (
      <div className="medicine-detail-page">
        <div className="container">
          <div className="loading">Loading medicine details...</div>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="medicine-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Medicine not found</h2>
            <button onClick={() => navigate('/medicines')} className="btn btn-primary">
              Browse Medicines
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="medicine-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="medicine-detail-content">
          <div className="medicine-image-section">
            <div className="medicine-image-wrapper">
              {medicine.discount > 0 && (
                <span className="discount-badge">-{medicine.discount}%</span>
              )}
              {medicine.prescriptionRequired && (
                <span className="prescription-badge">Rx Required</span>
              )}
              <img src={medicine.image} alt={medicine.name} className="medicine-image" />
            </div>
          </div>

          <div className="medicine-info-section">
            <div className="medicine-header">
              <h1 className="medicine-name">{medicine.name}</h1>
              <p className="medicine-brand">{medicine.brand}</p>
              <div className="medicine-category">{medicine.category}</div>
            </div>

            <div className="medicine-pricing">
              <div className="price-container">
                <span className="current-price">₹{medicine.price}</span>
                {medicine.originalPrice > medicine.price && (
                  <>
                    <span className="original-price">₹{medicine.originalPrice}</span>
                    <span className="savings">
                      Save ₹{medicine.originalPrice - medicine.price}
                    </span>
                  </>
                )}
              </div>
              {medicine.stock > 0 ? (
                <span className="stock-status in-stock">In Stock ({medicine.stock} units)</span>
              ) : (
                <span className="stock-status out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="medicine-actions">
              <div className="quantity-selector">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="quantity-btn"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="quantity-btn"
                  disabled={quantity >= medicine.stock}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary add-to-cart-btn-large"
                disabled={medicine.stock === 0}
              >
                Add to Cart
              </button>
            </div>

            <div className="medicine-tabs">
              <button
                className={`tab ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`tab ${activeTab === 'composition' ? 'active' : ''}`}
                onClick={() => setActiveTab('composition')}
              >
                Composition
              </button>
              <button
                className={`tab ${activeTab === 'usage' ? 'active' : ''}`}
                onClick={() => setActiveTab('usage')}
              >
                Usage
              </button>
              <button
                className={`tab ${activeTab === 'side-effects' ? 'active' : ''}`}
                onClick={() => setActiveTab('side-effects')}
              >
                Side Effects
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="tab-panel">
                  <h3>Description</h3>
                  <p>{medicine.description}</p>
                </div>
              )}
              {activeTab === 'composition' && (
                <div className="tab-panel">
                  <h3>Composition</h3>
                  <p>{medicine.composition}</p>
                </div>
              )}
              {activeTab === 'usage' && (
                <div className="tab-panel">
                  <h3>Usage Instructions</h3>
                  <p>{medicine.usage}</p>
                  {medicine.prescriptionRequired && (
                    <div className="prescription-warning">
                      ⚠️ This medicine requires a valid prescription from a licensed doctor.
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'side-effects' && (
                <div className="tab-panel">
                  <h3>Side Effects</h3>
                  <p>{medicine.sideEffects}</p>
                  <div className="medical-disclaimer">
                    <strong>Note:</strong> Consult your doctor if you experience any severe side effects.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;


