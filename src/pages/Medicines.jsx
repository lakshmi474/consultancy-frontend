import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MedicineCard from '../components/MedicineCard';
import Filters from '../components/Filters';
import './Medicines.css';

const Medicines = () => {
  const [searchParams] = useSearchParams();
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: '',
    priceRange: '',
    prescriptionRequired: '',
    search: searchParams.get('search') || '',
  });

  // Sync URL params with filters when URL changes
  useEffect(() => {
    const searchParam = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || '';
    
    setFilters((prev) => ({
      ...prev,
      search: searchParam,
      category: categoryParam,
    }));
  }, [searchParams]);

  useEffect(() => {
    const loadMedicines = async () => {
      const medicinesData = await import('../data/medicines.json');
      setMedicines(medicinesData.default);
      setLoading(false);
    };
    loadMedicines();
  }, []);

  useEffect(() => {
    let filtered = [...medicines];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (med) =>
          med.name.toLowerCase().includes(searchLower) ||
          med.brand.toLowerCase().includes(searchLower) ||
          med.category.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((med) => med.category === filters.category);
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter((med) => med.brand === filters.brand);
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(
          (med) => med.price >= min && med.price <= max
        );
      } else {
        filtered = filtered.filter((med) => med.price >= min);
      }
    }

    // Prescription filter
    if (filters.prescriptionRequired === 'yes') {
      filtered = filtered.filter((med) => med.prescriptionRequired);
    } else if (filters.prescriptionRequired === 'no') {
      filtered = filtered.filter((med) => !med.prescriptionRequired);
    }

    setFilteredMedicines(filtered);
  }, [medicines, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const brands = [...new Set(medicines.map((med) => med.brand))].sort();
  const categories = [...new Set(medicines.map((med) => med.category))].sort();

  if (loading) {
    return (
      <div className="medicines-page">
        <div className="container">
          <div className="loading">Loading medicines...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="medicines-page">
      <div className="container">
        <div className="medicines-header">
          <h1>
            {filters.search ? `Search Results for "${filters.search}"` : 
             filters.category ? `${filters.category}` : 
             'All Medicines'}
          </h1>
          <p className="results-count">
            {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="medicines-content">
          <aside className="filters-sidebar">
            <Filters
              filters={filters}
              brands={brands}
              categories={categories}
              onFilterChange={handleFilterChange}
            />
          </aside>

          <div className="medicines-grid-container">
            {filteredMedicines.length > 0 ? (
              <div className="medicines-grid">
                {filteredMedicines.map((medicine) => (
                  <MedicineCard key={medicine.id} medicine={medicine} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No medicines found matching your criteria.</p>
                <p>Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicines;


