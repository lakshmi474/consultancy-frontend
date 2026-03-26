import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getApiUrl } from '../utils/api';
import './Checkout.css';

// UPI Apps Data
const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', icon: '💳', color: '#4285F4' },
  { id: 'phonepe', name: 'PhonePe', icon: '💜', color: '#5F259F' },
  { id: 'paytm', name: 'Paytm', icon: '💙', color: '#00BAF2' },
  { id: 'amazonpay', name: 'Amazon Pay', icon: '🛒', color: '#FF9900' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🏦', color: '#FF6B35' },
  { id: 'cred', name: 'CRED', icon: '💎', color: '#000000' },
];

// Banks Data
const BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Indian Bank',
  'Indian Overseas Bank',
  'Central Bank of India',
  'IDBI Bank',
  'Yes Bank',
  'Federal Bank',
  'South Indian Bank',
  'Karur Vysya Bank',
  'City Union Bank',
  'DCB Bank',
  'RBL Bank',
];

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
    paymentMethod: 'cod',
    selectedUpiApp: null,
    selectedBank: '',
    upiId: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    netBankingUserId: '',
    netBankingPassword: '',
  });

  const [prescriptionFiles, setPrescriptionFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [showUpiApps, setShowUpiApps] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);
  const [showPrescriptionInfo, setShowPrescriptionInfo] = useState(false);

  const subtotal = getCartTotal();
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  // Check if any item requires prescription
  const requiresPrescription = cart.some((item) => item.prescriptionRequired);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    
    // Handle payment method changes
    if (name === 'paymentMethod') {
      setShowUpiApps(value === 'upi');
      setShowNetBanking(value === 'netbanking');
      setFormData((prev) => ({ 
        ...prev, 
        selectedUpiApp: null,
        selectedBank: '',
        upiId: '',
      }));
    }
  };

  const handleUpiAppSelect = (appId) => {
    setFormData((prev) => ({ ...prev, selectedUpiApp: appId }));
  };

  const sendOrderEmail = async (orderData) => {
    try {
      const apiUrl = getApiUrl();
      await fetch(`${apiUrl}/api/notify-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: orderData }),
      });
    } catch (error) {
      // Fail silently in UI; log for debugging
      console.error('Failed to send order email', error);
    }
  };

  const processPayment = async () => {
    if (validateForm()) {
      try {
        const paymentStatus = formData.paymentMethod === 'cod' ? 'Pending' : 'Paid';

        // Ensure we send valid MongoDB ObjectIds for medicines
        // In this demo, the medicines.json items have integer ids, which need to be translated 
        // to ObjectIds if you have seeded the DB, but assuming for the moment the items 
        // already have an `_id` field mapped to MongoDB if fetched from DB. 
        // We'll map the `id` or `_id` to `medicine` as required by the Order model.
        // TEMPORARY FIX: send the item without `medicine` if it's not a valid ObjectId to prevent Mongoose cast errors
        const orderItems = cart.map(item => {
          const m = item._id || item.id;
          const isObjectId = /^[0-9a-fA-F]{24}$/.test(m);
          return {
            ...(isObjectId ? { medicine: m } : {}),
            quantity: item.quantity,
            price: item.price
          };
        });

        const orderPayload = {
          user: user.id || user._id,
          items: orderItems,
          shippingAddress: {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          },
          subtotal,
          deliveryCharge,
          total,
          paymentMethod: formData.paymentMethod,
          paymentStatus,
          notes: "",
          prescriptionFiles: prescriptionFiles.map((f) => ({
            filename: f.name,
            path: f.dataUrl // In a real app we'd upload to S3/Cloudinary and save the URL
          }))
        };

        const apiUrl = getApiUrl();
        try {
          const response = await fetch(`${apiUrl}/api/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(orderPayload)
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to place order');
          }

          const savedOrder = await response.json();

          // Cache in localStorage for admin visibility even if offline
          const enrichedOrder = {
            ...savedOrder,
            name: formData.name,
            email: formData.email,
            shippingAddress: {
              ...savedOrder.shippingAddress,
              name: formData.name,
              email: formData.email
            }
          };
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
          localStorage.setItem('orders', JSON.stringify([enrichedOrder, ...existingOrders]));

          // Fire-and-forget email notification
          sendOrderEmail({
             ...savedOrder, 
             name: formData.name,
             email: formData.email, 
             phone: formData.phone,
             address: formData.address,
             city: formData.city,
             state: formData.state,
             pincode: formData.pincode,
             prescriptionFiles 
          });

          clearCart();
          navigate('/order-confirmation', { state: { orderId: savedOrder.orderNumber } });
        } catch (fetchError) {
          // Offline fallback: Handle network failures (like server being down)
          if (fetchError.message === 'Failed to fetch' || fetchError.name === 'TypeError') {
            console.warn('Checkout: API Offline, saving order to local storage.');
            const offlineOrderId = `ORD${Date.now().toString().slice(-8)}`;
            const offlineOrder = {
              ...orderPayload,
              _id: offlineOrderId,
              orderNumber: offlineOrderId,
              createdAt: new Date().toISOString(),
              status: 'Confirmed',
              shippingAddress: {
                ...orderPayload.shippingAddress,
                name: formData.name,
                email: formData.email
              }
            };
            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            localStorage.setItem('orders', JSON.stringify([offlineOrder, ...existingOrders]));
            clearCart();
            navigate('/order-confirmation', { state: { orderId: offlineOrderId } });
          } else {
            throw fetchError; // Re-throw real API errors (like 400/500)
          }
        }
      } catch (error) {
        setErrors((prev) => ({ ...prev, submit: error.message }));
      }
    }
  };

  const handleUpiPayment = () => {
    if (!formData.selectedUpiApp) {
      setErrors((prev) => ({ ...prev, upi: 'Please select a UPI app' }));
      return;
    }
    if (!formData.upiId.trim()) {
      setErrors((prev) => ({ ...prev, upi: 'Please enter your UPI ID' }));
      return;
    }
    // Simulate payment processing
    setTimeout(() => {
      processPayment();
    }, 2000);
  };

  const handleNetBankingPayment = () => {
    if (!formData.selectedBank) {
      setErrors((prev) => ({ ...prev, netbanking: 'Please select a bank' }));
      return;
    }
    if (!formData.netBankingUserId.trim() || !formData.netBankingPassword.trim()) {
      setErrors((prev) => ({ ...prev, netbanking: 'Please enter your credentials' }));
      return;
    }
    // Simulate payment processing
    setTimeout(() => {
      processPayment();
    }, 2000);
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      const enriched = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: await readFileAsDataUrl(file),
        }))
      );
      setPrescriptionFiles((prev) => [...prev, ...enriched]);
    } catch (error) {
      console.error('Failed to read prescription files', error);
    }
  };

  const removeFile = (index) => {
    setPrescriptionFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (requiresPrescription && prescriptionFiles.length === 0) {
      newErrors.prescription = 'Prescription is required for this order';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'upi' || formData.paymentMethod === 'netbanking') {
      return; // These are handled by their respective payment handlers
    }
    processPayment();
  };

  // Format card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <button onClick={() => navigate('/medicines')} className="btn btn-primary">
              Browse Medicines
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-content">
            <div className="checkout-main">
              {/* Delivery address */}
              <div className="form-section">
                <h2>Delivery Address</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label>Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={errors.state ? 'error' : ''}
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>

                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={errors.pincode ? 'error' : ''}
                    />
                    {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                  </div>
                </div>
              </div>

              {/* Prescription upload - always visible, but only required when needed */}
              <div className="form-section">
                <h2>Upload Prescription</h2>
                <div className="prescription-section">
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
                    {errors.prescription && (
                      <span className="error-message">{errors.prescription}</span>
                    )}
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
                <div className="prescription-note">
                  ⚠️ Prescription is required for prescription medicines. Please upload a clear
                  image or PDF of your prescription when your order contains such items.
                </div>
              </div>

              {/* Payment methods */}
              <div className="form-section">
                <h2>Payment Method</h2>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon">💵</span>
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon">💳</span>
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon">📱</span>
                    <span>UPI</span>
                    {formData.paymentMethod === 'upi' && <span className="expand-icon">▼</span>}
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon">🏦</span>
                    <span>Net Banking</span>
                    {formData.paymentMethod === 'netbanking' && <span className="expand-icon">▼</span>}
                  </label>
                </div>

                {/* UPI Apps Section */}
                {formData.paymentMethod === 'upi' && (
                  <div className="payment-details-section upi-section">
                    <h3>Choose UPI App</h3>
                    <div className="upi-apps-grid">
                      {UPI_APPS.map((app) => (
                        <div
                          key={app.id}
                          className={`upi-app-card ${formData.selectedUpiApp === app.id ? 'selected' : ''}`}
                          onClick={() => handleUpiAppSelect(app.id)}
                          style={{ '--app-color': app.color }}
                        >
                          <div className="upi-app-icon">{app.icon}</div>
                          <div className="upi-app-name">{app.name}</div>
                        </div>
                      ))}
                    </div>

                    {formData.selectedUpiApp && (
                      <div className="upi-payment-form">
                        <div className="selected-app-header">
                          <span className="selected-app-icon">
                            {UPI_APPS.find((app) => app.id === formData.selectedUpiApp)?.icon}
                          </span>
                          <span className="selected-app-name">
                            {UPI_APPS.find((app) => app.id === formData.selectedUpiApp)?.name}
                          </span>
                        </div>
                        <div className="form-group">
                          <label>Enter UPI ID</label>
                          <input
                            type="text"
                            name="upiId"
                            value={formData.upiId}
                            onChange={handleChange}
                            placeholder="yourname@upi"
                            className={errors.upi ? 'error' : ''}
                          />
                          <small className="form-hint">e.g., yourname@paytm, yourname@ybl</small>
                        </div>
                        {errors.upi && <span className="error-message">{errors.upi}</span>}
                        <div className="payment-amount-display">
                          <span>Amount to Pay:</span>
                          <span className="amount">₹{total.toFixed(2)}</span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary upi-pay-btn"
                          onClick={handleUpiPayment}
                        >
                          Pay ₹{total.toFixed(2)}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Net Banking Section */}
                {formData.paymentMethod === 'netbanking' && (
                  <div className="payment-details-section netbanking-section">
                    <h3>Select Your Bank</h3>
                    <div className="form-group">
                      <label>Choose Bank</label>
                      <select
                        name="selectedBank"
                        value={formData.selectedBank}
                        onChange={handleChange}
                        className={errors.netbanking ? 'error' : ''}
                      >
                        <option value="">-- Select Bank --</option>
                        {BANKS.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>

                    {formData.selectedBank && (
                      <div className="netbanking-payment-form">
                        <div className="selected-bank-header">
                          <span className="bank-icon">🏦</span>
                          <span className="bank-name">{formData.selectedBank}</span>
                        </div>
                        <div className="form-group">
                          <label>User ID / Customer ID</label>
                          <input
                            type="text"
                            name="netBankingUserId"
                            value={formData.netBankingUserId}
                            onChange={handleChange}
                            placeholder="Enter your User ID"
                            className={errors.netbanking ? 'error' : ''}
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            name="netBankingPassword"
                            value={formData.netBankingPassword}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className={errors.netbanking ? 'error' : ''}
                          />
                        </div>
                        {errors.netbanking && <span className="error-message">{errors.netbanking}</span>}
                        <div className="security-note">
                          <span className="security-icon">🔒</span>
                          <span>Your transaction is secured with 256-bit SSL encryption</span>
                        </div>
                        <div className="payment-amount-display">
                          <span>Amount to Pay:</span>
                          <span className="amount">₹{total.toFixed(2)}</span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary netbanking-pay-btn"
                          onClick={handleNetBankingPayment}
                        >
                          Pay ₹{total.toFixed(2)}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Payment Section */}
                {formData.paymentMethod === 'card' && (
                  <div className="payment-details-section card-section">
                    <h3>Card Details</h3>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          setFormData((prev) => ({ ...prev, cardNumber: formatted }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="card-details-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            const formatted = formatExpiry(e.target.value);
                            setFormData((prev) => ({ ...prev, cardExpiry: formatted }));
                          }}
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) {
                              setFormData((prev) => ({ ...prev, cardCvv: value }));
                            }
                          }}
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                    <div className="security-note">
                      <span className="security-icon">🔒</span>
                      <span>Your card details are secure and encrypted</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div className="checkout-summary">
              <h2>Order Summary</h2>
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="free-delivery">Free</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              
              {errors.submit && (
                <div className="error-alert" style={{ marginBottom: '1rem' }}>
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary place-order-btn"
                disabled={formData.paymentMethod === 'upi' || formData.paymentMethod === 'netbanking'}
              >
                {formData.paymentMethod === 'upi' || formData.paymentMethod === 'netbanking'
                  ? 'Complete Payment Above'
                  : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
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
    </div>
  );
};

export default Checkout;


