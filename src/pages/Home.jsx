import React from 'react';
import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import PopularMedicines from '../components/home/PopularMedicines';
import OffersSection from '../components/home/OffersSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <CategoryShowcase />
      <PopularMedicines />
      <OffersSection />
      <WhyChooseUs />
    </div>
  );
};

export default Home;


