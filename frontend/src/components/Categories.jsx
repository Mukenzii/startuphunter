import React from 'react';
import './Categories.css';
import { useLang } from '../i18n.jsx';

const Categories = ({ categories, activeCategory, onCategoryChange }) => {
  const { t, lang } = useLang();
  return (
    <div className="categories-section" id="categories">
      <div className="categories-container">
        <div className="categories-wrapper">
          {categories.map((category, index) => {
            const value = category.uz;
            const label =
              value === 'All' ? t('cat.all') : (lang === 'ru' ? category.ru : category.uz);
            return (
              <button
                key={index}
                className={`category-btn ${activeCategory === value ? 'active' : ''}`}
                onClick={() => onCategoryChange(value)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
