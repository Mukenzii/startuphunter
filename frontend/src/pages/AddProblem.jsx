import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './AddProblem.css';

const AddProblem = () => {
  const [language, setLanguage] = useState('UZ');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // mock auth state for now

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

  const questions = [
    {
      id: 1,
      title: '1-qadam. Muammoingizni qisqacha yozing',
      placeholder: 'Muammoingizni bir-ikki gapda tushuntirib bering...',
    },
    {
      id: 2,
      title: '2-qadam. Kimlar bu muammoga duch kelmoqda?',
      placeholder: 'Ma’lum auditoriyani iloji boricha aniqroq tasvirlab bering...',
    },
    {
      id: 3,
      title: "3-qadam. Hozir odamlar bu muammoni qanday yechishmoqda?",
      placeholder:
        'Odamlar hozirda foydalanayotgan yechimlar, ularning kamchiliklari haqida yozing...',
    },
    {
      id: 4,
      title: '4-qadam. Bu muammo qanchalik og‘riqli?',
      placeholder:
        'Nega bu muammo muhim? Odamlar bu muammo tufayli nimalarga duch kelishmoqda?',
    },
    {
      id: 5,
      title: '5-qadam. Siz bilan bog‘lanishimiz uchun kontakt ma’lumotlaringizni qoldiring',
      placeholder:
        'Ismingiz, telefon raqamingiz va/yoki email manzilingizni yozib qoldiring...',
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(
    questions.reduce((acc, q) => {
      acc[q.id] = '';
      return acc;
    }, {})
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    const questionId = questions[currentStep].id;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (currentStep < questions.length - 1) {
      // Steps 1–4: always go to next question
      setCurrentStep((prev) => prev + 1);
    } else {
      // Step 5: submit only if logged in
      if (!isLoggedIn) return;
      // Here you can later send data to backend
      setIsSubmitted(true);
      console.log('Submitted answers:', answers);
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="add-problem-page">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        categories={categories}
      />

      <div className="add-problem-container">
        {!isSubmitted ? (
          <div className="add-problem-card">
            <div className="add-problem-left">
              <div className="step-indicator">
                {currentStep + 1} / {questions.length}
              </div>
              <h1 className="add-problem-title">{currentQuestion.title}</h1>
            </div>

            <div className="add-problem-right">
              <form
                onSubmit={handleNext}
                className="add-problem-form"
                key={currentQuestion.id}
              >
                <label className="add-problem-label">
                  Javobingiz
                  <textarea
                    className="add-problem-textarea"
                    placeholder={currentQuestion.placeholder}
                    value={answers[currentQuestion.id]}
                    onChange={handleAnswerChange}
                    required
                  />
                </label>

                {currentStep < questions.length - 1 && (
                  <button type="submit" className="add-problem-button">
                    Keyingi savol
                  </button>
                )}

                {currentStep === questions.length - 1 && (
                  <>
                    {!isLoggedIn && (
                      <button
                        type="button"
                        className="add-problem-button add-problem-google-button"
                        onClick={() => {
                          // Here you can later trigger real Google OAuth
                          setIsLoggedIn(true);
                        }}
                      >
                        Google orqali kirish
                      </button>
                    )}

                    {isLoggedIn && (
                      <button type="submit" className="add-problem-button">
                        Yuborish
                      </button>
                    )}
                  </>
                )}
              </form>
            </div>
          </div>
        ) : (
          <div className="add-problem-complete">
            <h1 className="add-problem-complete-title">
              Rahmat! Muammoingiz qo‘shildi.
            </h1>
            <p className="add-problem-complete-text">
              Tez orada biz ushbu muammo bo‘yicha tahlil va potensial yechim
              g‘oyalarini tayyorlaymiz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProblem;


