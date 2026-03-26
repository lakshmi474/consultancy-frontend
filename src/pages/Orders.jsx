import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getApiUrl } from '../utils/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/orders?userId=${user.id || user._id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.reverse()); // Show newest first
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders.reverse());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  // Dynamic Polling: Refresh orders every 10 seconds when tracking modal is open
  useEffect(() => {
    let intervalId;
    if (trackingOrder) {
      intervalId = setInterval(() => {
        fetchOrders();
      }, 10000); // 10 seconds is a reasonable polling interval
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [trackingOrder]);

  // Keep trackingOrder state in sync with updated orders list
  useEffect(() => {
    if (trackingOrder) {
      const currentOrder = orders.find(o => (o._id || o.orderId) === (trackingOrder._id || trackingOrder.orderId));
      if (currentOrder && currentOrder.status !== trackingOrder.status) {
        setTrackingOrder(currentOrder);
      }
    }
  }, [orders]);

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/orders/${orderId}/cancel`, {
        method: 'POST',
      });
      if (response.ok) {
        alert('Order cancelled successfully');
        fetchOrders();
      } else {
        const err = await response.json();
        alert(err.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'var(--gray-600)';
    const s = status.toLowerCase();
    if (s === 'delivered' || s === 'approved' || s === 'confirmed') return 'var(--primary-green)';
    if (s === 'processing' || s === 'ready' || s === 'shipped') return 'var(--primary-blue)';
    if (s === 'out for delivery') return 'var(--yellow, #f59e0b)';
    if (s === 'rejected' || s === 'cancelled') return 'var(--danger-red, #ef4444)';
    return 'var(--gray-600)';
  };

  if (loading) {
    return <div className="orders-page"><div className="container"><p>Loading your orders...</p></div></div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h2>My Orders</h2>
        <div className="empty-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/medicines" className="btn btn-primary">
            Browse Medicines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id || order.orderId} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order.orderNumber || order.orderId}</h3>
                <p className="order-date">
                  Placed on {new Date(order.createdAt || order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="order-status-group">
                <div className="status-item">
                  <small>Order Status</small>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status || 'Confirmed'}
                  </span>
                </div>
                {order.prescriptionFiles && order.prescriptionFiles.length > 0 && (
                  <div className="status-item">
                    <small>Prescription</small>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.prescriptionStatus) }}
                    >
                      {order.prescriptionStatus || 'Pending'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <img src={item.medicine?.image || item.image} alt={item.medicine?.name || item.name} className="order-item-image" />
                  <div className="order-item-info">
                    <h4>{item.medicine?.name || item.name}</h4>
                    <p>{item.medicine?.brand || item.brand}</p>
                    <p className="order-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-meta">
                <div className="order-total">
                  <strong>Total: ₹{order.total.toFixed(2)}</strong>
                </div>
                {order.status !== 'Cancelled' && (
                  <div className="delivery-info">
                    {order.deliveryDate && order.status !== 'Delivered' ? (
                      <p className="delivery-est">
                        Estimated Delivery: <strong>{new Date(order.deliveryDate).toLocaleDateString()}</strong>
                      </p>
                    ) : (
                      order.status === 'Delivered' ? (
                        <p className="delivery-est" style={{ color: 'var(--primary-green)' }}>Delivered successfully!</p>
                      ) : (
                        <p className="delivery-est">Verification in progress...</p>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className="order-actions">
                {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                  <>
                    <button className="btn btn-outline" onClick={() => setTrackingOrder(order)}>Track Order</button>
                    {['Confirmed', 'Processing'].includes(order.status) && (
                      <button className="btn btn-danger" style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' }} onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                    )}
                  </>
                )}
                <Link to={`/order-confirmation`} state={{ orderId: order.orderNumber }} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {trackingOrder && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>Track Order #{trackingOrder.orderNumber}</h3>
              <button className="close-btn" onClick={() => setTrackingOrder(null)}>×</button>
            </div>
            <div className="modal-body" style={{ padding: '30px' }}>
              <div className="tracking-timeline">
                {[
                  { key: 'Confirmed', label: 'Order Confirmed', date: trackingOrder.createdAt },
                  { key: 'Processing', label: 'Processing', date: null },
                  { key: 'Ready', label: 'Ready for Shipping', date: null },
                  { key: 'Out for Delivery', label: 'Out for Delivery', date: null },
                  { key: 'Delivered', label: 'Delivered', date: trackingOrder.deliveryDate }
                ].map((step, idx, arr) => {
                  const currentStatus = (trackingOrder.status || 'Confirmed').toLowerCase();
                  const stepKey = step.key.toLowerCase();
                  const isActive = arr.findIndex(s => s.key.toLowerCase() === currentStatus) >= idx;
                  const isLastActive = currentStatus === stepKey;
                  
                  return (
                    <div key={step.key} className={`timeline-step ${isActive ? 'active' : ''}`}>
                      <div className="step-marker">
                        <div className={`circle ${isActive ? 'filled' : ''} ${isLastActive ? 'pulse' : ''}`}></div>
                        {idx < arr.length - 1 && <div className="line"></div>}
                      </div>
                      <div className="step-content">
                        <p className="step-label">{step.label}</p>
                        {isActive && step.date && (
                          <small className="step-date">{new Date(step.date).toLocaleDateString()}</small>
                        )}
                        {!isActive && <small className="step-date">Pending</small>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;


