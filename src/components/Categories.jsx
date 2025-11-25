import React from 'react';
import './Categories.css';

const Categories = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="categories-section">
      <div className="categories-container">
        <div className="categories-wrapper">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
