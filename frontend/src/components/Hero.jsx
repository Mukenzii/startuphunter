import React from 'react';
import './Hero.css';



const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div class="scc">
</div>

        {/* Add your green vector SVG background here */}
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          Odamlarga chindan ham<br />
          kerak bo'lgan startap g'oyalari
        </h1>
        <p className="hero-subtitle">
          Odamlarning yechim uchun pul to'lashga tayyor bo'lgan hal qilinmagan muammolari.
        </p>
      </div>
    </section>
  );
};

export default Hero;
