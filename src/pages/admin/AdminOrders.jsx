import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../../utils/api';
import { mockOrders } from './adminMockData';
import './AdminPanel.css';

// Order status options that admin can set
const statusOptions = ['Confirmed', 'Processing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/orders`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.reverse());
      } else {
        throw new Error('API fetch failed');
      }
    } catch (error) {
      console.warn('AdminOrders: API failed, falling back to localStorage/mock data:', error);
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (savedOrders.length > 0) {
        setOrders(savedOrders.reverse());
      } else {
        // Map mockOrders to match the structure if needed
        const mappedMock = mockOrders.map(o => ({
          _id: o.orderId,
          orderNumber: o.orderId,
          user: { name: o.customer },
          total: o.amount,
          status: o.status === 'Placed' ? 'Confirmed' : o.status,
          paymentMethod: 'card',
          paymentStatus: o.paymentStatus,
          createdAt: new Date(o.date).toISOString(),
          items: Array(o.items).fill({ price: o.amount / o.items, quantity: 1 })
        }));
        setOrders(mappedMock);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchOrders(); // Refresh list
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-orders">
      <div className="admin-card">
        <h4>Order List</h4>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.orderNumber || order.orderId || order._id || 'N/A'}</td>
                      <td>
                        {order.user?.name ||
                         order.shippingAddress?.name ||
                         order.name ||
                         order.customer ||
                         'Guest'}
                      </td>
                      <td>₹{Number(order.total || order.amount || 0).toFixed(2)}</td>
                      <td>
                        <span className={`status info`}>
                          {order.paymentMethod?.toUpperCase() || 'COD'} - {order.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <select
                          className={`pill ${getStatusClass(order.status)}`}
                          value={order.status || 'Confirmed'}
                          onChange={(e) => updateOrderStatus(order._id || order.id || order.orderId, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-ghost" onClick={() => setSelectedOrder(order)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="admin-card" style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>Order Details - {selectedOrder.orderNumber}</h4>
            <button className="btn btn-ghost" onClick={() => setSelectedOrder(null)}>
              Close
            </button>
          </div>
          <div className="admin-grid" style={{ marginTop: 12 }}>
            <div className="admin-card">
              <h4>Customer Info</h4>
              <p><strong>Name:</strong> {selectedOrder.user?.name || selectedOrder.shippingAddress?.name}</p>
              <p><strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}</p>
              <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
            </div>
            <div className="admin-card">
              <h4>Shipping Address</h4>
              <p>{selectedOrder.shippingAddress?.address}</p>
              <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}</p>
            </div>
            <div className="admin-card">
              <h4>Items Summary</h4>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} style={{ fontSize: '13px', marginBottom: '4px' }}>
                  {item.medicine?.name || 'Medicine'} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              ))}
              <hr/>
              <p><strong>Total: ₹{selectedOrder.total.toFixed(2)}</strong></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
