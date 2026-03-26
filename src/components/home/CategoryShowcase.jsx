import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryShowcase.css';

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    import('../../data/categories.json').then((data) => {
      setCategories(data.default);
    });
  }, []);

  return (
    <section className="category-showcase" data-scroll data-animation="fade-in-up">
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/medicines?category=${encodeURIComponent(category.name)}`}
              className="category-card"
              data-scroll
              data-animation="zoom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="category-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop';
                  }}
                />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;


