import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <div className="order-confirmation-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p className="order-id">Order ID: <strong>{orderId}</strong></p>
          <p className="confirmation-message">
            Thank you for your order. We have received your order and will begin processing it right
            away. You will receive an email confirmation shortly.
          </p>

          <div className="next-steps">
            <h2>What's Next?</h2>
            <ul>
              <li>We will verify your prescription (if required)</li>
              <li>Your order will be packed and dispatched</li>
              <li>You will receive tracking information via email</li>
              <li>Your order will be delivered to the address provided</li>
            </ul>
          </div>

          <div className="confirmation-actions">
            <Link to="/account/orders" className="btn btn-primary">
              View Order Details
            </Link>
            <Link to="/medicines" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;


