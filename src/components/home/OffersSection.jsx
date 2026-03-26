import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OffersSection.css';

// Import images
import discountImg from '../../assets/offers/discount.png';
import deliveryImg from '../../assets/offers/delivery.png';
import checkupImg from '../../assets/offers/checkup.png';

const OffersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const offers = [
    {
      id: 1,
      title: 'Flat 20% OFF',
      subtitle: 'On all medicines',
      description: 'Use code: MED20',
      color: 'var(--primary-blue)',
      link: '/offers',
      image: discountImg,
    },
    {
      id: 2,
      title: 'Free Delivery',
      subtitle: 'On orders above ₹500',
      description: 'No delivery charges',
      color: 'var(--primary-green)',
      link: '/offers',
      image: deliveryImg,
    },
    {
      id: 3,
      title: 'Buy 2 Get 1',
      subtitle: 'On selected items',
      description: 'Limited time offer',
      color: 'var(--red)',
      link: '/offers',
      image: checkupImg, // Or any appropriate image
    },
    {
      id: 4,
      title: 'Extra 10% OFF',
      subtitle: 'On first order',
      description: 'Use code: FIRST10',
      color: '#9B59B6',
      link: '/offers',
      image: discountImg, // Reuse or add more images if needed
    },
    {
      id: 5,
      title: 'Cashback 5%',
      subtitle: 'On wallet payments',
      description: 'Instant cashback',
      color: '#F39C12',
      link: '/offers',
      image: deliveryImg, // Reuse or add more images if needed
    },
    {
      id: 6,
      title: 'Health Checkup',
      subtitle: 'Free with orders above ₹1000',
      description: 'Book now & save',
      color: '#E74C3C',
      link: '/offers',
      image: checkupImg,
    },
  ];

  const totalOffers = offers.length;
  const visibleOffers = 3; // Number of offers visible at once

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalOffers - visibleOffers + 1));
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [totalOffers, visibleOffers]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalOffers - visibleOffers + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalOffers - visibleOffers : prevIndex - 1
    );
  };

  return (
    <section className="offers-section" data-scroll data-animation="fade-in-up">
      <div className="container">
        <h2 className="section-title">Special Offers & Discounts</h2>
        <div className="offers-carousel-container">
          <button 
            className="carousel-btn carousel-btn-prev" 
            onClick={prevSlide}
            aria-label="Previous offers"
          >
            ‹
          </button>
          
          <div className="offers-carousel-wrapper">
            <div 
              className="offers-carousel"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleOffers)}%)` }}
            >
              {offers.map((offer, index) => (
                <Link
                  key={offer.id}
                  to={offer.link}
                  className="offer-card"
                  style={{
                    '--offer-color': offer.color,
                  }}
                >
                  <div className="offer-image-container">
                    <img src={offer.image} alt={offer.title} className="offer-image" />
                  </div>
                  <div className="offer-content">
                    <h3 className="offer-title">{offer.title}</h3>
                    <p className="offer-subtitle">{offer.subtitle}</p>
                    <p className="offer-description">{offer.description}</p>
                    <div className="offer-actions">
                      <div className="claim-offer-btn">Claim Offer</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button 
            className="carousel-btn carousel-btn-next" 
            onClick={nextSlide}
            aria-label="Next offers"
          >
            ›
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {Array.from({ length: totalOffers - visibleOffers + 1 }).map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;


