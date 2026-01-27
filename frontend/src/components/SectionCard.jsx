import React from 'react';
import './SectionCard.css';

const truncateText = (text, limit) => {
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const SectionCard = ({ section, onClick }) => {
  const dateText = section.created_at
    ? new Date(section.created_at).toISOString().slice(0, 10)
    : '';
  const titleText =
    section.title?.trim() ||
    truncateText(section.q1 || section.q2 || section.q3, 45) ||
    'This section is currently empty';
  const descriptionText = truncateText(section.q1, 180);

  return (
    <div className="section-card" onClick={onClick}>
      <div className="section-card-text">
        <h3 className="section-card-title">{titleText}</h3>
        {descriptionText ? (
          <p className="section-card-description">{descriptionText}</p>
        ) : (
          <p className="section-card-description">
            Select products from the catalogue and they will be waiting for you here.
          </p>
        )}
      </div>

      <div className="section-card-footer">
        <span className="section-card-date">{dateText}</span>
      </div>
    </div>
  );
};

export default SectionCard;
