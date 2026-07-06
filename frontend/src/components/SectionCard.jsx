import React from 'react';
import './SectionCard.css';
import { useLang } from '../i18n.jsx';

const truncateText = (text, limit) => {
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const formatDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
};

const SectionCard = ({ section, onClick }) => {
  const { t } = useLang();
  const dateText = formatDate(section.created_at);
  const titleText =
    section.title?.trim() ||
    truncateText(section.q1 || section.q2 || section.q3, 45) ||
    t('card.emptyTitle');
  const descriptionText =
    truncateText(section.q1, 180) || t('card.emptyDesc');

  return (
    <button className="section-card" type="button" onClick={onClick}>
      <h3 className="section-card-title">{titleText}</h3>
      <p className="section-card-description">{descriptionText}</p>
      {dateText && <span className="section-card-date">{dateText}</span>}
    </button>
  );
};

export default SectionCard;
