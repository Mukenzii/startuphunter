import React from 'react';
import './SectionCard.css';

const SectionCard = ({ section, onClick }) => {
  return (
    <div className="section-card" onClick={onClick}>
      <div className="section-card-meta">
        <span className="section-card-country">{section.country || 'USA'}</span>
      </div>

      <div className="section-card-content">
        <h3 className="section-card-title">{section.title}</h3>
      </div>

      <div className="section-card-footer">
        <span className="section-card-date">
          {new Date(section.created_at).toISOString().slice(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default SectionCard;
