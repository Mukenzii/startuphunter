import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionsGrid.css';
import SectionCard from './SectionCard';

const SectionsGrid = ({ sections }) => {  // Remove activeCategory prop
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  // Use sections directly - no filtering needed
  const visibleSections = sections.slice(0, visibleCount);

  const hasMore = visibleCount < sections.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleSectionClick = (sectionId) => {
    navigate(`/section/${sectionId}`);
  };

  return (
    <div className="sections-grid-wrapper">
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
    </div>
  );
};

export default SectionsGrid;