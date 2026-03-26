import React from 'react';
import { Link } from 'react-router-dom';
import MedicineCard from '../components/MedicineCard';
import OffersSection from '../components/home/OffersSection';
import './Offers.css';

const Offers = () => {
  // Get medicines with discounts
  const [offers, setOffers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/medicines');
        if (!response.ok) throw new Error('Failed to fetch medicines');
        const data = await response.json();
        // Filter medicines that have a discount > 0
        const discounted = data.filter((med) => med.discount > 0);
        setOffers(discounted);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError(err.message);
        setLoading(false);
        
        // Fallback to static data if API fails
        import('../data/medicines.json').then((data) => {
          const discounted = data.default.filter((med) => med.discount > 0);
          setOffers(discounted);
        });
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="offers-page">
      <div className="container">
        <OffersSection />
        <div className="offers-medicines">
          <h2>Medicines with Offers</h2>
          {loading ? (
            <div className="loading">Loading offers...</div>
          ) : error ? (
            <div className="error-message">Note: Showing available offers (could not connect to live server)</div>
          ) : null}
          
          <div className="medicines-grid">
            {offers.length > 0 ? (
              offers.map((medicine) => (
                <MedicineCard key={medicine.id || medicine._id} medicine={medicine} />
              ))
            ) : !loading && (
              <p className="no-offers">No special offers available at the moment. Check back soon!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;


