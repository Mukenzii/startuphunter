import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';
import { useLang } from '../i18n.jsx';

const About = () => {
  const { t } = useLang();

  const scrollToContact = () => {
    const el = document.getElementById('contact-authors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="about-page">
      <Navbar />

      <main className="about-wrapper">
        <section className="about-hero">
          <h1 className="about-title">{t('about.title')}</h1>
          <p className="about-lead">{t('about.lead')}</p>
          <div className="about-actions">
            <button className="about-primary" onClick={scrollToContact}>
              {t('about.contactBtn')}
            </button>
            <a className="about-outline" href="#platform-video">
              {t('about.videoBtn')}
            </a>
          </div>
        </section>

        <section className="about-grid">
          <div className="about-card story-card">
            <h3>{t('about.mission')}</h3>
            <p>{t('about.missionText')}</p>
            <div className="story-points">
              <div className="story-point">
                <span className="story-number">01</span>
                <div>
                  <h4>{t('about.point1Title')}</h4>
                  <p>{t('about.point1Text')}</p>
                </div>
              </div>
              <div className="story-point">
                <span className="story-number">02</span>
                <div>
                  <h4>{t('about.point2Title')}</h4>
                  <p>{t('about.point2Text')}</p>
                </div>
              </div>
              <div className="story-point">
                <span className="story-number">03</span>
                <div>
                  <h4>{t('about.point3Title')}</h4>
                  <p>{t('about.point3Text')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-card contact-card" id="contact-authors">
            <div>
              <h3>{t('about.contactTitle')}</h3>
              <p className="contact-text">{t('about.contactText')}</p>
            </div>
            <div className="contact-actions">
              <a
                className="login-button"
                href="https://t.me/startuphunter"
                target="_blank"
                rel="noreferrer"
              >
                {t('about.telegramBtn')}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
