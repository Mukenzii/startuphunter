import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './SectionDetail.css';

const questionPrompts = [
  { key: 'q1', title: '1-qadam. Muammoingizni qisqacha yozing' },
  { key: 'q2', title: '2-qadam. Kimlar bu muammoga duch kelmoqda?' },
  { key: 'q3', title: "3-qadam. Hozir odamlar bu muammoni qanday yechishmoqda?" },
  { key: 'q4', title: '4-qadam. Bu muammo qanchalik og\'riqli?' },
  { key: 'author', title: '5. Muammo muallifi:' },
];

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
  const [language, setLanguage] = useState('UZ');
  const [categories, setCategories] = useState([]);
  const [problem, setProblem] = useState(null);
  const [comment, setComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/startuphunterapp/categories/')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');

    fetch('http://localhost:8000/startuphunterapp/problems/category/All/')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => String(item.id) === String(id));
        if (!found) {
          setError('Muammo topilmadi');
        }
        setProblem(found || null);
      })
      .catch(() => {
        setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const categoryLabel = useMemo(() => {
    if (!problem) return '';
    const found = categories.find((cat) => Number(cat.id) === Number(problem.category));
    return found?.title || 'All';
  }, [categories, problem]);

  const navbarCategories = useMemo(
    () => ['All', ...categories.map((cat) => cat.title)],
    [categories]
  );

  const formattedDate = useMemo(() => {
    if (!problem?.created_at) return '';
    const date = new Date(problem.created_at);
    return isNaN(date.getTime()) ? problem.created_at : date.toLocaleDateString();
  }, [problem]);

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = () => {
    // Replace with real login flow later
    setIsLoggedIn(true);
  };

  const handleSubmitComment = () => {
    // Hook up to backend later
    console.log('Comment submitted:', comment);
  };

  return (
    <div className="section-detail-page">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        categories={navbarCategories}
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
        {loading && (
          <div className="section-detail-content">
            <p className="section-detail-loading">Yuklanmoqda...</p>
          </div>
        )}

        {!loading && error && (
          <div className="section-detail-content">
            <p className="section-detail-error">{error}</p>
          </div>
        )}

        {!loading && problem && (
          <div className="section-detail-content">
            <div className="section-detail-header">
              <div className="section-detail-meta">
                <span className="section-detail-category">{categoryLabel}</span>
                <span className="section-detail-date">{formattedDate}</span>
              </div>
              <h1 className="section-detail-title">{problem.title || problem.q1}</h1>
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
            <div className="section-detail-body">
              <div className="question-list">
                {questionPrompts.map((prompt) => {
                  if (prompt.key === 'author') {
                    return (
                      <div key={prompt.key} className="question-item">
                        <h3 className="question-heading">{prompt.title}</h3>
                        <div className="author-details">
                          <p className="author-row"><span className="author-label">Ism:</span> {problem.username || 'Noma\'lum'}</p>
                          <p className="author-row"><span className="author-label">Mamlakat:</span> {problem.country || 'Noma\'lum'}</p>
                          <p className="author-row">
                            <span className="author-label">Kontaktlar:</span>{' '}
                            {problem.user_contact ? (
                              <a href={`mailto:${problem.user_contact}`} className="author-contact">{problem.user_contact}</a>
                            ) : (
                              'Ko\'rsatilmagan'
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={prompt.key} className="question-item">
                      <h3 className="question-heading">{prompt.title}</h3>
                      <p className="question-text">
                        {problem[prompt.key] || 'Javob kiritilmagan'}
                      </p>
                    </div>
                  );
                })}
              </div>
              </div>

            <div className="comment-section">
              <h3 className="comment-title">Fikr qoldiring</h3>
              <textarea
                className="comment-textarea"
                placeholder="Bu muammo haqida fikringizni yozing..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {!isLoggedIn ? (
                <button
                  className="comment-button comment-button-secondary"
                  onClick={() => {
                    window.location.href = 'https://comments.app/view/uUhG_oYK';
                    handleLogin();
                  }}
                >
                  Avval tizimga kiring
                </button>
              ) : (
                <button
                  className="comment-button comment-button-primary"
                  onClick={handleSubmitComment}
                  disabled={!comment.trim()}
                >
                  Izohni yuborish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionDetail;
