import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="footer-title">Muammoingiz bormi?</h2>
        <p className="footer-description">
          Agar sizda muammo bo'lsa va uni yechish uchun hamkorlikda asos soluvchi 
          izlayotgan bo'lsangiz, endi muammont tavsiflovchi shaklning oxiriga belgi qo'yishning 
          o'zi yetarli - biz buni e'londa ko'rsatamiz. Muammongizni minglab asos soluvchilar 
          ko'radi, ularning ko'pchiligi ham o'zlariga sherik izlayotgan bo'ladi.
        </p>
        <div className="footer-buttons">
          <button className="footer-btn footer-btn-primary">Muammo qo'shish</button>
          <button className="footer-btn footer-btn-secondary">Ko'proq</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
