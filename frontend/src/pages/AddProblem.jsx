import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import './AddProblem.css';
import { useLang } from '../i18n.jsx';
import { apiUrl } from '../api';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const REQUIRE_GOOGLE = !!GOOGLE_CLIENT_ID;

const AddProblem = () => {
  const { t, lang } = useLang();

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Google sign-up state.
  const [googleUser, setGoogleUser] = useState(null); // { email, name }
  const [googleError, setGoogleError] = useState('');
  const googleBtnRef = useRef(null);

  const questions = [
    { id: 1, titleKey: 'add.step1Title', phKey: 'add.step1Ph' },
    { id: 2, titleKey: 'add.step2Title', phKey: 'add.step2Ph' },
    { id: 3, titleKey: 'add.step3Title', phKey: 'add.step3Ph' },
    { id: 4, titleKey: 'add.step4Title', phKey: 'add.step4Ph' },
    { id: 5, titleKey: 'add.step5Title', phKey: '' },
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

  const isLastStep = currentStep === questions.length - 1;
  const allFilled = Boolean(name.trim() && contact.trim() && selectedCategory);
  // The bottom CTA becomes the Google button once every field is filled.
  const showGoogleCta = isLastStep && REQUIRE_GOOGLE && !googleUser && allFilled;

  useEffect(() => {
    setCategoriesLoading(true);
    setCategoryError('');
    fetch(apiUrl('/startuphunterapp/categories/'))
      .then((res) => {
        if (!res.ok) throw new Error('load');
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && !selectedCategory) {
          setSelectedCategory(String(data[0].id));
        }
      })
      .catch(() => {
        setCategoryError(t('add.errLoad'));
      })
      .finally(() => setCategoriesLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitProblem = () => {
    if (!name.trim() || !contact.trim() || !selectedCategory) {
      setSubmitError(t('add.errFill'));
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    const payload = {
      category: Number(selectedCategory),
      username: name,
      country: 'Uzbekistan',
      q1: answers[1],
      q2: answers[2],
      q3: answers[3],
      q4: answers[4],
      user_contact: contact,
    };

    fetch(apiUrl('/startuphunterapp/problems/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('submit');
        return res.json();
      })
      .then(() => setIsSubmitted(true))
      .catch(() => setSubmitError(t('add.errSubmit')))
      .finally(() => setSubmitting(false));
  };

  // Verify the Google credential, capture the user, then submit the problem.
  const handleGoogleCredential = (response) => {
    setGoogleError('');
    fetch(apiUrl('/startuphunterapp/auth/google/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('google');
        return res.json();
      })
      .then((data) => {
        setGoogleUser({ email: data.email, name: data.name });
        submitProblem();
      })
      .catch(() => setGoogleError(t('add.googleError')));
  };

  // Render the official "Sign up with Google" button in place of the submit
  // button, once all fields are filled. Waits for the GIS script to load.
  useEffect(() => {
    if (!showGoogleCta) return;
    let cancelled = false;
    const render = () => {
      if (cancelled) return;
      if (window.google?.accounts?.id && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredential,
        });
        googleBtnRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'filled_black',
          size: 'large',
          text: 'signup_with',
          shape: 'pill',
        });
      } else {
        setTimeout(render, 300);
      }
    };
    render();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGoogleCta]);

  const handleAnswerChange = (e) => {
    const value = e.target.value;
    const questionId = questions[currentStep].id;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    // On the last step, require Google sign-up before sending (the actual
    // submit happens inside handleGoogleCredential after auth). This guards the
    // Enter-key path; the visible CTA is the Google button itself.
    if (REQUIRE_GOOGLE && !googleUser) {
      setSubmitError(t('add.googleRequired'));
      return;
    }
    submitProblem();
  };

  const currentQuestion = questions[currentStep];
  const categoryLabel = (cat) =>
    lang === 'ru' ? cat.title_ru || cat.title : cat.title;

  return (
    <div className="add-problem-page">
      <Navbar />

      <div className="add-problem-container">
        {!isSubmitted ? (
          <div className="add-problem-card">
            <div className="add-problem-left">
              <div className="step-indicator">
                {currentStep + 1} / {questions.length}
              </div>
              <h1 className="add-problem-title">{t(currentQuestion.titleKey)}</h1>
            </div>

            <div className="add-problem-right">
              <form
                onSubmit={handleNext}
                className="add-problem-form"
                key={currentQuestion.id}
              >
                {!isLastStep && (
                  <label className="add-problem-label">
                    {t('add.answerLabel')}
                    <textarea
                      className="add-problem-textarea"
                      placeholder={t(currentQuestion.phKey)}
                      value={answers[currentQuestion.id]}
                      onChange={handleAnswerChange}
                      required
                    />
                  </label>
                )}

                {isLastStep && (
                  <div className="add-problem-contact-fields">
                    <label className="add-problem-label">
                      {t('add.nameLabel')}
                      <input
                        type="text"
                        className="add-problem-input"
                        placeholder={t('add.namePh')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </label>
                    <label className="add-problem-label">
                      {t('add.contactLabel')}
                      <input
                        type="text"
                        className="add-problem-input"
                        placeholder={t('add.contactPh')}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                      />
                    </label>
                    <label className="add-problem-label">
                      {t('add.categoryLabel')}
                      <select
                        className="add-problem-input"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        disabled={categoriesLoading}
                        required
                      >
                        <option value="">
                          {categoriesLoading
                            ? t('add.categoryLoading')
                            : t('add.categorySelect')}
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {categoryLabel(category)}
                          </option>
                        ))}
                      </select>
                      {categoryError && (
                        <span className="add-problem-error">{categoryError}</span>
                      )}
                    </label>
                  </div>
                )}

                {googleUser && (
                  <p className="google-signed-in">
                    ✓ {t('add.googleSignedIn')} <strong>{googleUser.name}</strong>
                  </p>
                )}

                {/* --- bottom CTA --- */}
                {!isLastStep && (
                  <button type="submit" className="add-problem-button">
                    {t('add.nextBtn')}
                  </button>
                )}

                {isLastStep && showGoogleCta && (
                  <div ref={googleBtnRef} className="google-cta" />
                )}

                {isLastStep && !showGoogleCta && (
                  <button
                    type="submit"
                    className="add-problem-button"
                    disabled={!allFilled || submitting}
                  >
                    {submitting ? t('add.submitting') : t('add.submitBtn')}
                  </button>
                )}

                {googleError && <p className="add-problem-error">{googleError}</p>}
                {submitError && <p className="add-problem-error">{submitError}</p>}
              </form>
            </div>
          </div>
        ) : (
          <div className="add-problem-complete">
            <h1 className="add-problem-complete-title">{t('add.doneTitle')}</h1>
            <p className="add-problem-complete-text">{t('add.doneText')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProblem;
