import React, { useEffect, useState } from 'react';
import MedicineCard from '../MedicineCard';
import { Link } from 'react-router-dom';
import './PopularMedicines.css';

const PopularMedicines = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    import('../../data/medicines.json').then((data) => {
      // Get 8 popular medicines (first 8 with discounts)
      const popular = data.default
        .filter((med) => med.discount > 0)
        .slice(0, 8);
      setMedicines(popular);
    });
  }, []);

  return (
    <section className="popular-medicines" data-scroll data-animation="fade-in-up">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Medicines</h2>
          <Link to="/medicines" className="view-all-link">
            View All →
          </Link>
        </div>
        <div className="medicines-grid">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMedicines;


