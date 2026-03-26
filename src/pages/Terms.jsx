import React from 'react';
import './Compliance.css';

const Terms = () => {
  return (
    <div className="compliance-page">
      <div className="container">
        <h1>Terms & Conditions</h1>
        <div className="compliance-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on MediCare's
              website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2>3. Medical Disclaimer</h2>
            <p>
              The information provided on this website is for informational purposes only and should
              not be used as a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </section>

          <section>
            <h2>4. Prescription Medicines</h2>
            <p>
              Prescription medicines require a valid prescription from a licensed medical
              practitioner. We reserve the right to verify prescriptions and refuse orders if
              prescriptions are invalid.
            </p>
          </section>

          <section>
            <h2>5. Order Processing</h2>
            <p>
              Orders are subject to stock availability. We reserve the right to cancel orders if
              medicines are out of stock or if prescription verification fails.
            </p>
          </section>

          <section>
            <h2>6. Pricing</h2>
            <p>
              All prices are in Indian Rupees (₹). Prices are subject to change without notice. We
              reserve the right to correct pricing errors.
            </p>
          </section>

          <section>
            <h2>7. Delivery</h2>
            <p>
              Delivery times are estimates and not guaranteed. We are not liable for delays caused
              by external factors.
            </p>
          </section>

          <section>
            <h2>8. Returns & Refunds</h2>
            <p>
              Please refer to our Return & Refund Policy for detailed information on returns and
              refunds.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              MediCare shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages.
            </p>
          </section>

          <section>
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the website
              constitutes acceptance of modified terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;


