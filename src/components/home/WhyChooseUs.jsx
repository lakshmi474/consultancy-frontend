import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      icon: '🛡️',
      title: 'Genuine Medicines',
      description: '100% authentic medicines from licensed suppliers. Every product is verified for quality and authenticity.',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery to your doorstep. Same-day delivery available in select areas.',
    },
    {
      icon: '🏥',
      title: 'Licensed Pharmacy',
      description: 'Fully licensed and regulated pharmacy. All medications are dispensed by qualified pharmacists.',
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and offers. Get the best value for your money.',
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Safe and secure payment gateway. Your personal and financial information is protected.',
    },
    {
      icon: '👨‍⚕️',
      title: 'Expert Support',
      description: '24/7 customer support from qualified pharmacists. Get answers to all your medication queries.',
    },
  ];

  return (
    <section className="why-choose-us" data-scroll data-animation="fade-in-up">
      <div className="container">
        <h2 className="section-title">Why Choose MediCare?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              data-scroll
              data-animation="zoom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;


