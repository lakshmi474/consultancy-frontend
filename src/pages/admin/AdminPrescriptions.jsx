import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../../utils/api';
import { mockOrders } from './adminMockData';
import './AdminPanel.css';

const AdminPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingFile, setViewingFile] = useState(null);

  const fetchPrescriptions = async () => {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/orders`);
      if (response.ok) {
        const data = await response.json();
        processOrders(data);
      } else {
        throw new Error('API fetch failed');
      }
    } catch (error) {
      console.warn('AdminPrescriptions: API failed, falling back to local data:', error);
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (savedOrders.length > 0) {
        processOrders(savedOrders);
      } else {
        // Fallback to mock data mixed with some dummy prescriptions
        const mockPrescData = mockOrders.map(o => ({
          _id: o.orderId,
          orderNumber: o.orderId,
          user: { 
            name: o.customer, 
            email: `${o.customer.toLowerCase().replace(/ /g, '.')}@example.com` 
          },
          createdAt: new Date(o.date).toISOString(),
          prescriptionFiles: [
            { filename: 'prescription_copy.pdf', path: 'https://via.placeholder.com/600x800?text=Prescription+Preview' }
          ],
          prescriptionStatus: 'Pending'
        }));
        processOrders(mockPrescData);
      }
    } finally {
      setLoading(false);
    }
  };

  const processOrders = (data) => {
    const flattened = data
      .filter((o) => Array.isArray(o.prescriptionFiles) && o.prescriptionFiles.length > 0)
      .map((o) => ({
        id: o._id || o.orderId,
        orderNumber: o.orderNumber || o.orderId,
        user: o.user?.name || o.shippingAddress?.name || o.name || o.customer || 'Unknown',
        userEmail: o.user?.email || o.shippingAddress?.email || o.email || '',
        uploadedAt: o.createdAt || o.orderDate || o.date || new Date(),
        status: o.prescriptionStatus || 'Pending',
        files: o.prescriptionFiles.map((file, idx) => ({
          ...file,
          filename: file.filename || `File ${idx + 1}`
        })),
      }));
    setPrescriptions(flattened);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/orders/${id}/prescription-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status,
          deliveryDate: status === 'Approved' ? new Date(Date.now() + 3*24*60*60*1000) : null // 3 days from now
        }),
      });
      
      if (response.ok) {
        fetchPrescriptions(); // Refresh list
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-prescriptions">
      <div className="admin-card">
        <h4>Uploaded prescriptions</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>User</th>
                  <th>Uploaded</th>
                  <th>Status</th>
                  <th>Files (Click to view)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-state">
                      No prescriptions uploaded yet.
                    </td>
                  </tr>
                ) : (
                  prescriptions.map((p) => (
                    <tr key={p.id}>
                      <td>{p.orderNumber}</td>
                      <td>{p.user} <br/><small>{p.userEmail}</small></td>
                      <td>{new Date(p.uploadedAt).toLocaleString()}</td>
                      <td>
                        <span
                          className={`status ${
                            p.status === 'Approved' ? 'success' : p.status === 'Rejected' ? 'danger' : 'warning'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td>
                        {p.files.map((file, idx) => (
                          <button 
                            key={idx} 
                            className="link-btn" 
                            style={{ display: 'block', padding: '4px 0', textAlign: 'left' }}
                            onClick={() => setViewingFile(file.path)}
                          >
                            {file.filename || `File ${idx + 1}`}
                          </button>
                        ))}
                      </td>
                      <td className="table-actions">
                        <button className="btn btn-primary" onClick={() => updateStatus(p.id, 'Approved')}>
                          Approve
                        </button>
                        <button className="btn btn-danger" onClick={() => updateStatus(p.id, 'Rejected')}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ marginTop: 12, color: '#4b5563' }}>
          Valid prescriptions must be approved before orders can be processed.
        </div>
      </div>

      {/* Basic File Viewer Modal */}
      {viewingFile && (
        <div className="admin-modal-overlay" onClick={() => setViewingFile(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Prescription View</h3>
              <button className="close-btn" onClick={() => setViewingFile(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <img src={viewingFile} alt="Prescription" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrescriptions;
