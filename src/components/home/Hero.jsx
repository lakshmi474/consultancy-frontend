import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" data-scroll data-animation="fade-in-up">
      <div className="hero-background"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Trusted Online Pharmacy
            <span className="hero-subtitle">100% Genuine Medicines | Fast Delivery</span>
          </h1>
          <p className="hero-description">
            Order authentic medicines online from a licensed pharmacy. 
            Get genuine medications delivered to your doorstep with complete safety and care.
          </p>
          <div className="hero-cta">
            <Link to="/medicines" className="btn btn-primary btn-large">
              Order Medicines Online
            </Link>
            <Link to="/offers" className="btn btn-outline btn-large">
              View Offers
            </Link>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <span className="feature-icon">✅</span>
              <span>Licensed Pharmacy</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">🛡️</span>
              <span>100% Genuine</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">🚚</span>
              <span>Fast Delivery</span>
            </div>
            <div className="hero-feature">
              <span className="feature-icon">🔒</span>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


