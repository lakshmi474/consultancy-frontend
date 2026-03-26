import React from 'react';
import './Prescriptions.css';

const Prescriptions = () => {
  const prescriptions = [];

  return (
    <div className="prescriptions-page">
      <h2>Prescription History</h2>
      {prescriptions.length === 0 ? (
        <div className="empty-prescriptions">
          <p>No prescriptions uploaded yet.</p>
          <p>Upload prescriptions when placing orders for prescription medicines.</p>
        </div>
      ) : (
        <div className="prescriptions-list">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="prescription-card">
              {/* Prescription display */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prescriptions;


