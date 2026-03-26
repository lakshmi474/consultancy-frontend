import React from 'react';
import './Compliance.css';

const Privacy = () => {
  return (
    <div className="compliance-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <div className="compliance-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including name, email,
              phone number, shipping address, and prescription information.
            </p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to process orders, send order confirmations,
              provide customer support, and send marketing communications (with your consent).
            </p>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with service
              providers who assist us in operating our website and conducting our business.
            </p>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2>5. Cookies</h2>
            <p>
              We use cookies to enhance your experience, analyze site usage, and assist in our
              marketing efforts. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You can
              also opt-out of marketing communications at any time.
            </p>
          </section>

          <section>
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 18. We do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section>
            <h2>8. Changes to Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any
              changes by posting the new policy on this page.
            </p>
          </section>

          <section>
            <h2>9. Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at
              privacy@medicare.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;


