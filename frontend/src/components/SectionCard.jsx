import React from 'react';
import './SectionCard.css';

const SectionCard = ({ section, onClick }) => {
  return (
    <div className="section-card" onClick={onClick}>
      <div className="section-card-content">
        <h3 className="section-card-title">{section.title}</h3>
        <p className="section-card-description">{section.description}</p>
      </div>
      <div className="section-card-footer">
        <span className="section-card-date">{section.date}</span>
      </div>
    </div>
  );
};

export default SectionCard;
