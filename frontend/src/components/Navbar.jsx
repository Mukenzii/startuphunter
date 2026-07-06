import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.svg';
import { LANGUAGES, useLang } from '../i18n.jsx';
import { usePresence } from '../usePresence';

const Chevron = () => (
  <svg className="nav-chevron" viewBox="0 0 12 8" fill="none" aria-hidden="true">
    <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Globe = () => (
  <svg className="nav-globe" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const OnlineBadge = () => {
  const { t } = useLang();
  const online = usePresence();
  if (online == null) return null;
  return (
    <span className="online-badge" title={t('nav.onlineTitle')}>
      <span className="online-dot" aria-hidden="true" />
      <strong>{online}</strong>
      <span className="online-label">{t('nav.online')}</span>
    </span>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const switchRef = useRef(null);

  // Close the dropdown when clicking outside it.
  useEffect(() => {
    const onClick = (e) => {
      if (switchRef.current && !switchRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <button className="navbar-logo" type="button" onClick={() => navigate('/')}>
          <img src={logo} alt="Muammo Ixtier" />
        </button>

        {/* Center pill */}
        <div className="navbar-center">
          <button className="nav-link" type="button" onClick={() => navigate('/about')}>
            {t('nav.about')}
          </button>
          <OnlineBadge />
        </div>

        {/* Right section */}
        <div className="navbar-right">
          <div className="lang-switch" ref={switchRef}>
            <button
              className="lang-pill"
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <Globe />
              <span>{lang.toUpperCase()}</span>
              <Chevron />
            </button>
            {open && (
              <ul className="lang-menu" role="listbox">
                {LANGUAGES.map((code) => (
                  <li key={code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === code}
                      className={`lang-option ${lang === code ? 'active' : ''}`}
                      onClick={() => {
                        setLang(code);
                        setOpen(false);
                      }}
                    >
                      {code.toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="login-button" onClick={() => navigate('/add-problem')}>
            {t('nav.add')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
