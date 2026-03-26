import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [prescriptionFiles, setPrescriptionFiles] = useState([]);
  const [showPrescriptionInfo, setShowPrescriptionInfo] = useState(false);
  const [showVerificationSent, setShowVerificationSent] = useState(false);
  const recipientEmail = 'illakshmi2705@gmail.com';

  const subtotal = getCartTotal();
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;
  const requiresPrescription = cart.some((item) => item.prescriptionRequired);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPrescriptionFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setPrescriptionFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendPrescription = () => {
    if (!prescriptionFiles.length) return;
    const subject = 'Prescription upload for verification';
    const fileList = prescriptionFiles.map((f) => f.name).join(', ');
    const bodyLines = [
      'Hello Pharmacist,',
      '',
      'Please verify the following prescription files:',
      fileList || '(no files listed)',
      '',
      'Thank you.',
    ];
    const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    setShowVerificationSent(true);
    setTimeout(() => setShowVerificationSent(false), 3000);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some medicines to get started!</p>
            <Link to="/medicines" className="btn btn-primary">
              Browse Medicines
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <h2>Items ({cart.length})</h2>
              <button onClick={clearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <Link to={`/medicine/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="cart-item-info">
                  <Link to={`/medicine/${item.id}`} className="cart-item-name">
                    {item.name}
                  </Link>
                  <p className="cart-item-brand">{item.brand}</p>
                  <p className="cart-item-category">{item.category}</p>
                  {item.prescriptionRequired && (
                    <span className="cart-item-rx">Rx Required</span>
                  )}
                </div>
                <div className="cart-item-price">
                  <span className="item-price">₹{item.price}</span>
                  <span className="item-total">₹{item.price * item.quantity}</span>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-item-btn"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span>
                {deliveryCharge === 0 ? (
                  <span className="free-delivery">Free</span>
                ) : (
                  `₹${deliveryCharge}`
                )}
              </span>
            </div>
            {subtotal < 500 && (
              <div className="delivery-note">
                Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
              </div>
            )}
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/medicines" className="continue-shopping">
              Continue Shopping →
            </Link>
          </div>

            {requiresPrescription && (
              <div className="cart-prescription-section">
                <div className="prescription-card upload-card">
                  <div className="upload-header">
                    <div>
                      <p className="eyebrow-text">Enjoy Easy and hassle free ordering</p>
                      <p className="turnaround">
                        In just <strong>5 mins</strong>
                      </p>
                    </div>
                  </div>
                  <label className="file-upload-label">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      multiple
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <div className="file-upload-area stacked">
                      <span>📄</span>
                      <span className="upload-cta">Upload Prescription</span>
                      <span className="file-hint">PDF, PNG, JPG (Max 5MB each)</span>
                    </div>
                  </label>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => setShowPrescriptionInfo(true)}
                  >
                    What is valid prescription?
                  </button>
                  {prescriptionFiles.length > 0 && (
                    <div className="uploaded-files">
                      {prescriptionFiles.map((file, index) => (
                        <div key={index} className="uploaded-file">
                          <span>📄 {file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="remove-file-btn"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn pharmacist-verify-btn"
                    disabled={!prescriptionFiles.length}
                    onClick={handleSendPrescription}
                  >
                    Pharmacist Verification
                  </button>
                  <div className="discount-banner">
                    <span>💡</span>
                    <span>Upto 25%* discount on every order</span>
                  </div>
                </div>

                <div className="prescription-card steps-card">
                  <h3>How will the Pharmacist help you?</h3>
                  <div className="pharmacist-steps">
                    {[
                      'Pharmacist will check items on prescription and add to cart',
                      'You can ask for additional items if needed',
                      'They will apply the best coupon & get you the max savings',
                      'Choose the earliest delivery date',
                      'Finally, share payment methods options',
                    ].map((text, idx) => (
                      <div key={idx} className="pharmacist-step">
                        <div className="step-number">{idx + 1}</div>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
      {showPrescriptionInfo && (
        <div className="prescription-modal-backdrop" onClick={() => setShowPrescriptionInfo(false)}>
          <div
            className="prescription-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modal-header">
              <h3>A valid prescription contains:</h3>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowPrescriptionInfo(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-grid">
              {[
                'Doctor Details',
                'Date of Prescription',
                'Patient Details',
                'Dosage Details',
              ].map((label) => (
                <div key={label} className="modal-chip">
                  <span role="img" aria-label={label}>
                    📄
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="modal-section">
              <h4>Do’s and Don’ts</h4>
              <ul>
                <li>
                  <span className="status-icon success">✓</span>
                  <div>
                    <strong>Upload clear image</strong>
                    <p>
                      Ensure handwriting/type is visible. Place prescription on a flat surface for a
                      clear image.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="status-icon danger">✕</span>
                  <div>
                    <strong>No picture of medicines</strong>
                    <p>Upload the doctor’s prescription, not photos of the medicines.</p>
                  </div>
                </li>
                <li>
                  <span className="status-icon danger">✕</span>
                  <div>
                    <strong>Do not crop the image</strong>
                    <p>Keep all corners and details visible for verification.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {showVerificationSent && (
        <div className="verification-toast">
          Mail sent, please wait for approval
        </div>
      )}
    </>
  );
};

export default Cart;

