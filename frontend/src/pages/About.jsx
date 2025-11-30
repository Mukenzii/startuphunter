import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './About.css';

const About = () => {
  const [language, setLanguage] = useState('UZ');

  const categories = [
    'All',
    'No-code',
    'Marketing va Sotuv',
    'Retail',
    'HR & Recruitment',
    'Meditsina va Sog\'liqni saqlash',
    'Biznes',
    'Logistika',
    'Moliya va buxgalteriya',
    'Huquqshunoslik',
    'Oziq-ovqat',
    'Ta\'lim'
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact-authors');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="about-page">
      <Navbar 
        language={language}
        onLanguageChange={setLanguage}
        categories={categories}
      />

      <main className="about-wrapper">
        <section className="about-hero">
          <h1 className="about-title">
            Startuphunter — o'zbek loyihalari uchun real muammolar va echimlar maydoni
          </h1>
          <p className="about-lead">
            Biz mahsulot yaratuvchilarni, startap asoschilarini va tadbirkorlarni bir joyga to'playmiz. 
            Platforma orqali foydalanuvchilar hal qilinishi kerak bo'lgan muammolarni ulashadi, 
            siz esa o'z yechimingiz bilan tezda chiqishingiz mumkin.
          </p>
          <div className="about-actions">
            <button className="about-primary" onClick={scrollToContact}>
              Mualliflar bilan bog'lanish
            </button>
            <a 
              className="about-outline" 
              href="#platform-video"
            >
              Loyihaning qisqa videosi
            </a>
          </div>
        </section>

        <section className="about-grid">
          <div className="about-card story-card">
            <h3>Missiyamiz</h3>
            <p>
              Har kuni ko'plab muammolar aniqlanadi, biroq ularni yechadigan 
              mahsulotlar yetishmaydi. Startuphunter har kimga muammo va yechimlarni 
              tez topish, hamkorlar bilan tanishish va fikr almashish imkonini beradi.
            </p>
            <div className="story-points">
              <div className="story-point">
                <span className="story-number">01</span>
                <div>
                  <h4>Real ehtiyojlar</h4>
                  <p>Muammolarni foydalanuvchilarning o'zi yuboradi, shuning uchun talab tasdiqlangan.</p>
                </div>
              </div>
              <div className="story-point">
                <span className="story-number">02</span>
                <div>
                  <h4>Hamjamiyat</h4>
                  <p>Mahsulotchilar, dizaynerlar va tadbirkorlar birgalikda ishlashi uchun xavfsiz maydon.</p>
                </div>
              </div>
              <div className="story-point">
                <span className="story-number">03</span>
                <div>
                  <h4>Tez iteratsiya</h4>
                  <p>G'oya → prototip → foydalanuvchi fikri siklini tezlashtiramiz.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-card contact-card" id="contact-authors">
            <div>
              <h3>Mualliflar bilan to'g'ridan-to'g'ri bog'laning</h3>
              <p className="contact-text">
                Hamkorlik, media hamkorlik yoki platformani rivojlantirish bo'yicha 
                takliflaringiz bormi? Biz har bir fikrni qadrlaymiz.
              </p>
            </div>
            <div className="contact-actions">
              <a
                className="login-button"
                href="https://t.me/startuphunter"
                target="_blank"
                rel="noreferrer"
              >
                Telegramda yozish
              </a>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default About;
