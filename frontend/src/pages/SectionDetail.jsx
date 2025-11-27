import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './SectionDetail.css';

const SectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = [
    'All',
    'No-code',
    'Marketing va Sotuv',
    'Retail',
    'HR & Recruitment',
    "Meditsina va Sog'liqni saqlash",
    'Biznes',
    'Logistika',
    'Moliya va buxgalteriya',
    'Huquqshunoslik',
    'Oziq-ovqat',
    "Ta'lim",
  ];

  // Mock data - replace with actual API call
  const sectionData = {
    id: id,
    title: 'This section is currently empty',
    description: 'Select products from the catalogue and they will be waiting for you here. This is a detailed view of the section where you can see all the information about this particular problem or challenge.',
    date: '12.04.2025',
    category: 'All',
    fullContent: `
      This is the full detailed content of the section. Here you would display:
      
      - Complete problem description
      - Detailed analysis
      - Proposed solutions
      - Additional resources
      - Comments and discussions
      - Related sections
      
      This content would come from your database and can include rich formatting,
      images, videos, and other media.
    `
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="section-detail-page">
      <Navbar 
        language="UZ"
        onLanguageChange={() => {}}
        categories={categories}
      />
      
      <div className="section-detail-container">
        <button className="back-button" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path 
              d="M12.5 15L7.5 10L12.5 5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Orqaga qaytish
        </button>

        <div className="section-detail-content">
          <div className="section-detail-header">
            <div className="section-detail-meta">
              <span className="section-detail-category">{sectionData.category}</span>
              <span className="section-detail-date">{sectionData.date}</span>
            </div>
            <h1 className="section-detail-title">{sectionData.title}</h1>
          </div>

          <div className="section-detail-body">
            <p className="section-detail-description">{sectionData.description}</p>
            <div className="section-detail-full-content">
              {sectionData.fullContent.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="section-detail-actions">
            <button className="action-button action-button-primary">
              Muammo ustida ishlash
            </button>
            <button className="action-button action-button-secondary">
              Bog'lanish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
