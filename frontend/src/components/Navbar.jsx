import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.svg';

const Navbar = ({ categories }) => {
  const [theme, setTheme] = useState('light');
  const [showDarkAlert, setShowDarkAlert] = useState(false);
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
      setShowDarkAlert(true);
    } else {
      setTheme('light');
      setShowDarkAlert(false);
    }
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

        {/* Right section with theme toggle and add problem button */}
        <div className="navbar-right">
          <button className="theme-toggle" onClick={handleThemeToggle}>
            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            className="login-button"
            onClick={() => navigate('/add-problem')}
          >
            Muammo qo'shish
          </button>
        </div>
      </div>

      {showDarkAlert && (
        <div
          className="dark-mode-alert-overlay"
          onClick={() => setShowDarkAlert(false)}
        >
          <div className="dark-mode-alert-card" onClick={(e) => e.stopPropagation()}>
            <h3>Dark rejim tez orada</h3>
            <p>Dark rejim imkoniyati tez orada foydalanuvchilarga taqdim etiladi.</p>
            <div className="dark-mode-alert-actions">
              <button
                className="dark-mode-alert-close"
                onClick={() => setShowDarkAlert(false)}
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
