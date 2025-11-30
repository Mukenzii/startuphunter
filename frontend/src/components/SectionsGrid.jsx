import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionsGrid.css';
import SectionCard from './SectionCard';

const SectionsGrid = ({ sections, activeCategory }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  // Filter sections based on active category
  const filteredSections = activeCategory === 'All' 
    ? sections 
    : sections.filter(section => section.category === activeCategory);

  // Get visible sections
  const visibleSections = filteredSections.slice(0, visibleCount);

  // Check if there are more sections to load
  const hasMore = visibleCount < filteredSections.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleSectionClick = (sectionId) => {
    // Navigate to section detail page
    navigate(`/section/${sectionId}`);
  };

  const handleAddProblem = () => {
    navigate('/add-problem');
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
