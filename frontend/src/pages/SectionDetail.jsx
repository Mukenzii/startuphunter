import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './SectionDetail.css';

const SectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [];

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = `http://localhost:8000/startuphunterapp/problems/${id}/`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch problem');
        return res.json();
      })
      .then((data) => {
        const mapped = {
          id: data.id,
          title: data.title || data.q1?.slice(0, 30) || 'No title',
          date: data.created_at ? new Date(data.created_at).toISOString().slice(0, 10) : '',
          qa: [
                { question: 'Muammoingizni qisqacha yozing', answer: data.q1 || '' },
                { question: 'Kimlar bu muammoga duch kelmoqda?', answer: data.q2 || '' },
                { question: "Hozir odamlar bu muammoni qanday yechishmoqda?", answer: data.q3 || '' },
                { question: "Bu muammo qanchalik og'riqli?", answer: data.q4 || '' },
                { 
                  question: "Kontakt ma'lumotlaringizni qoldiring", 
                  answer: `${data.username || ''} ${data.user_contact || ''}` 
                },
              ]
        };
        setSectionData(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  const dateText = sectionData?.date || '';
  const titleText = sectionData?.title || '';

  return (
    <div className="section-detail-page">
      <Navbar 
        language="UZ"
        onLanguageChange={() => {}}
        categories={categories}
      />
      
      <div className="section-detail-container">
        <div className="section-detail-content">
          <div className="section-detail-top">
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
              Orqaga
            </button>
            <span className="section-detail-date">{dateText}</span>
          </div>

          <div className="section-detail-header">
            <h1 className="section-detail-title">{titleText}</h1>
          </div>

          <div className="section-detail-body">
            {loading && <p className="section-detail-loading">Loading...</p>}
            {error && <p className="section-detail-error">{error}</p>}
            {!loading && sectionData && (
              <div className="section-detail-qa">
                {sectionData.qa.map((item, idx) => (
                  <div key={idx} className="qa-item">
                    <p className="qa-question">{item.question}</p>
                    <p className="qa-answer">{item.answer}</p>
                  </div>
                ))}
              </div>
            )}
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
