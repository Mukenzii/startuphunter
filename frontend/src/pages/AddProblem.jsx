import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './AddProblem.css';

const AddProblem = () => {
  const [language, setLanguage] = useState('UZ');

  const categories = ['All', 'No-code'];

  const questions = [
    {
      id: 1,
      title: '1-qadam. Muammoingizni qisqacha yozing',
      placeholder: 'Muammoingizni bir-ikki gapda tushuntirib bering...',
    },
    {
      id: 2,
      title: '2-qadam. Kimlar bu muammoga duch kelmoqda?',
      placeholder: 'Maʼlum auditoriyani iloji boricha aniqroq tasvirlab bering...',
    },
    {
      id: 3,
      title: "3-qadam. Hozir odamlar bu muammoni qanday yechishmoqda?",
      placeholder:
        'Odamlar hozirda foydalanayotgan yechimlar, ularning kamchiliklari haqida yozing...',
    },
    {
      id: 4,
      title: '4-qadam. Bu muammo qanchalik ogʻriqli?',
      placeholder:
        'Nega bu muammo muhim? Odamlar bu muammo tufayli nimalarga duch kelishmoqda?',
    },
    {
      id: 5,
      title: '5-qadam. Siz bilan bogʻlanishimiz uchun kontakt maʼlumotlaringizni qoldiring',
      placeholder: '',
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(
    questions.reduce((acc, q) => {
      acc[q.id] = '';
      return acc;
    }, {})
  );
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
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
      setCurrentStep((prev) => prev + 1);
    } else {
      if (!name.trim() || !contact.trim()) return;
      setSubmitting(true);
      setSubmitError('');

      const payload = {
        category: 1, // adjust when category selection is available
        username: name,
        country: 'Uzbekistan',
        q1: answers[1],
        q2: answers[2],
        q3: answers[3],
        q4: answers[4],
        user_contact: contact,
      };

      fetch('http://localhost:8000/startuphunterapp/problems/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Yuborishda xatolik');
          return res.json();
        })
        .then(() => {
          setIsSubmitted(true);
        })
        .catch((err) => {
          setSubmitError(err.message || "Yuborishda muammo yuz berdi");
        })
        .finally(() => setSubmitting(false));
    }
  };

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

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
                {!isLastStep && (
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
                )}

                {isLastStep && (
                  <div className="add-problem-contact-fields">
                    <label className="add-problem-label">
                      Ismingiz
                      <input
                        type="text"
                        className="add-problem-input"
                        placeholder="Ismingizni kiriting"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </label>
                    <label className="add-problem-label">
                      Kontakt ma'lumotlari
                      <input
                        type="text"
                        className="add-problem-input"
                        placeholder="Telefon yoki email"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                )}

                {currentStep < questions.length - 1 && (
                  <button type="submit" className="add-problem-button">
                    Keyingi savol
                  </button>
                )}

                {isLastStep && (
                  <button
                    type="submit"
                    className="add-problem-button"
                    disabled={!name.trim() || !contact.trim() || submitting}
                  >
                    {submitting ? 'Yuborilmoqda...' : 'Yuborish'}
                  </button>
                )}

                {submitError && (
                  <p className="add-problem-error">{submitError}</p>
                )}
              </form>
            </div>
          </div>
        ) : (
          <div className="add-problem-complete">
            <h1 className="add-problem-complete-title">
              Rahmat! Muammoingiz qoʻshildi.
            </h1>
            <p className="add-problem-complete-text">
              Tez orada biz ushbu muammo boʻyicha tahlil va potensial yechim
              gʻoyalarini tayyorlaymiz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProblem;
