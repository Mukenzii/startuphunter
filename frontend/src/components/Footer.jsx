import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import { useLang } from '../i18n.jsx';

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">{t('footer.title')}</h2>
        <p className="footer-description">{t('footer.desc')}</p>
        <div className="footer-buttons">
          <button
            className="footer-btn footer-btn-primary"
            type="button"
            onClick={() => navigate('/add-problem')}
          >
            {t('nav.add')}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
