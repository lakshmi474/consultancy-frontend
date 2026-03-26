import React, { useState } from 'react';
import './Filters.css';

const Filters = ({ filters, brands, categories, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      brand: '',
      priceRange: '',
      prescriptionRequired: '',
      search: '',
    });
  };

  const hasActiveFilters = 
    filters.category || 
    filters.brand || 
    filters.priceRange || 
    filters.prescriptionRequired;

  return (
    <div className="filters">
      <div className="filters-header">
        <h2>Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="clear-filters">
            Clear All
          </button>
        )}
        <button
          className="filters-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle filters"
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>

      <div className={`filters-content ${isOpen ? 'open' : ''}`}>
        {/* Search */}
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search medicines..."
            className="filter-input"
          />
        </div>

        {/* Category */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div className="filter-group">
          <label className="filter-label">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className="filter-select"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            className="filter-select"
          >
            <option value="">All Prices</option>
            <option value="0-100">₹0 - ₹100</option>
            <option value="100-500">₹100 - ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="1000-">Above ₹1000</option>
          </select>
        </div>

        {/* Prescription Required */}
        <div className="filter-group">
          <label className="filter-label">Prescription</label>
          <select
            value={filters.prescriptionRequired}
            onChange={(e) => handleChange('prescriptionRequired', e.target.value)}
            className="filter-select"
          >
            <option value="">All</option>
            <option value="no">No Prescription</option>
            <option value="yes">Prescription Required</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;


