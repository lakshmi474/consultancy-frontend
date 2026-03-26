import React from 'react';
import './Compliance.css';

const Returns = () => {
  return (
    <div className="compliance-page">
      <div className="container">
        <h1>Return & Refund Policy</h1>
        <div className="compliance-content">
          <section>
            <h2>1. Return Policy</h2>
            <p>
              Medicines cannot be returned once purchased, except in cases of manufacturing defects
              or incorrect items delivered. Unopened, non-prescription items may be returned within
              7 days of delivery.
            </p>
          </section>

          <section>
            <h2>2. Refund Eligibility</h2>
            <p>
              Refunds are processed only for eligible items. Prescription medicines, opened items,
              and items without proper packaging are not eligible for refunds.
            </p>
          </section>

          <section>
            <h2>3. Refund Process</h2>
            <p>
              To request a refund, contact our customer support within 7 days of delivery. Provide
              order number and reason for return. Refunds will be processed within 7-14 business
              days.
            </p>
          </section>

          <section>
            <h2>4. Defective Products</h2>
            <p>
              If you receive a defective or damaged product, contact us immediately with photos.
              We will arrange for replacement or full refund.
            </p>
          </section>

          <section>
            <h2>5. Cancellation Policy</h2>
            <p>
              Orders can be cancelled before they are processed. Once an order is processed, it
              cannot be cancelled. Contact customer support for assistance.
            </p>
          </section>

          <section>
            <h2>6. Return Shipping</h2>
            <p>
              Return shipping charges may apply unless the return is due to our error. We will
              provide return instructions upon approval of return request.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Returns;


