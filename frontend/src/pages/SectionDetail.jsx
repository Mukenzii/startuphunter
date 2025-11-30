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
    qa: [
      {
        question: 'Muammoingizni qisqacha yozing',
        answer: 'Viloyat markazidagi klinikalarda elektron navbat yo\'q, odamlar erta kelib navbat band qiladi va vaqtini yo\'qotadi.',
      },
      {
        question: 'Kimlar bu muammoga duch kelmoqda?',
        answer: 'Asosan 25-45 yoshdagi bemorlar va ularning qarindoshlari. Tibbiyot xodimlari ham navbatni qo\'lda yuritishdan charchagan.',
      },
      {
        question: 'Hozir odamlar bu muammoni qanday yechishmoqda?',
        answer: 'Qo\'ng\'iroq qilib yozilish yoki tanishlari orqali navbatga qo\'yishadi. Ayrim klinikalar Excel jadvali yuritadi, lekin real vaqtda yangilanmaydi.',
      },
      {
        question: 'Bu muammo qanchalik og‘riqli?',
        answer: 'Har kuni o\'rtacha 1-2 soat navbat kutishadi, noto\'g\'ri navbat tashkiloti sabab tortishuvlar bo\'ladi, klinika brendi salbiy ta\'sir ko\'radi.',
      },
      {
        question: 'Kontakt ma’lumotlaringizni qoldiring',
        answer: 'Ism: Dilshod, Telefon: +998 90 123 45 67, Email: dilshod@example.com',
      },
    ],
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
            <span className="section-detail-date">{sectionData.date}</span>
          </div>

          <div className="section-detail-header">
            <h1 className="section-detail-title">{sectionData.title}</h1>
          </div>

          <div className="section-detail-body">
            <p className="section-detail-description">{sectionData.description}</p>
            <div className="section-detail-qa">
              {sectionData.qa.map((item, idx) => (
                <div key={idx} className="qa-item">
                  <p className="qa-question">{item.question}</p>
                  <p className="qa-answer">{item.answer}</p>
                </div>
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
