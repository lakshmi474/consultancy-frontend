import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About MediCare</h3>
            <p>
              Your trusted online pharmacy for genuine medicines. Licensed and verified pharmacy
              ensuring 100% authentic medications with fast delivery.
            </p>
            <div className="license-info">
              <strong>License No:</strong> PH/2023/12345
              <br />
              <strong>Registered Pharmacy</strong>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/medicines">All Medicines</Link></li>
              <li><Link to="/offers">Offers & Discounts</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/returns">Return & Refund Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Customer Care</h3>
            <ul>
              <li>📞 9994360660</li>
              <li>📧starmedicals.kkdi@gmail.com</li>
              <li>🕐 Mon-Sat: 9 AM - 9 PM</li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Safety & Compliance</h3>
            <ul>
              <li>✅ Licensed Pharmacy</li>
              <li>🛡️ Genuine Medicines Only</li>
              <li>🔒 Secure Transactions</li>
              <li>📋 Prescription Verified</li>
              <li><Link to="/safety">Safety Information</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            <strong>Medical Disclaimer:</strong> The information provided on this website is for
            informational purposes only and should not be used as a substitute for professional
            medical advice, diagnosis, or treatment. Always seek the advice of your physician or
            other qualified health provider with any questions you may have regarding a medical
            condition. Never disregard professional medical advice or delay in seeking it because
            of something you have read on this website.
          </p>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 MediCare. All rights reserved.</p>
          <p>
            Licensed Pharmacy | Verified by Pharmacy Council | 100% Authentic Medicines
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


