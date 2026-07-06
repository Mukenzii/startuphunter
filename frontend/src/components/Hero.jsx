import React from 'react';
import './Hero.css';
import { useLang } from '../i18n.jsx';

const Hero = () => {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>
      </div>
    </section>
  );
};

export default Hero;
