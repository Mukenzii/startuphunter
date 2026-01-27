import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionsGrid.css';
import SectionCard from './SectionCard';

const SectionsGrid = ({ sections }) => {
  const [visibleCount, setVisibleCount] = useState(12);
  const navigate = useNavigate();

  // Use sections directly - no filtering needed
  const visibleSections = sections.slice(0, visibleCount);

  const hasMore = visibleCount < sections.length;

  const handleSectionClick = (sectionId) => {
    navigate(`/section/${sectionId}`);
  };

  const handleAddProblem = () => {
    navigate('/add-problem');
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <div className="sections-grid-wrapper">
      {visibleSections.length === 0 ? (
        <div className="sections-empty-state">
          <div className="empty-card">
            <p className="empty-title">Bu kategoriyada hozircha hech narsa yo‘q.</p>
            <p className="empty-text">
              Agar sizda muammo bo‘lsa, uni ulashing — uni birinchi bo‘lib siz qo‘shishingiz mumkin.
            </p>
            <button className="empty-action" onClick={handleAddProblem}>
              Muammo qo‘shish
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="sections-grid">
            {visibleSections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                onClick={() => handleSectionClick(section.id)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Ko'proq muammolar
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SectionsGrid;
