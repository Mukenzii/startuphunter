import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.svg';

const Navbar = ({ language, onLanguageChange, categories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langDropdownRef = useRef(null);
  const navigate = useNavigate();

  const languages = ['UZ', 'RU', 'EN'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo - click to go to homepage */}
        <button
          className="navbar-logo"
          type="button"
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="Muammo Ixtier" />
        </button>

        {/* Center section removed per request */}

        {/* Right section with language and login */}
        <div className="navbar-right">
          <div className="language-selector" ref={langDropdownRef}>
            <button 
              className="language-toggle"
              onClick={toggleLangDropdown}
            >
              <img src="/globe.svg" alt="" className="language-globe" />
              {language}
              <svg 
                className={`arrow ${isLangDropdownOpen ? 'rotate' : ''}`}
                width="10" 
                height="6" 
                viewBox="0 0 10 6" 
                fill="none"
              >
                <path 
                  d="M1 1L5 5L9 1" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isLangDropdownOpen && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className={`language-item ${language === lang ? 'active' : ''}`}
                    onClick={() => {
                      onLanguageChange(lang);
                      setIsLangDropdownOpen(false);
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="login-button"
            onClick={() => navigate('/add-problem')}
          >
            Muammo qo'shish
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
