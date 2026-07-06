import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import SectionsGrid from './components/SectionsGrid';
import Footer from './components/Footer';
import { apiUrl } from './api';

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [language, setLanguage] = useState('UZ');
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch(apiUrl('/startuphunterapp/categories/'))
      .then(response => response.json())
      .then(data => {
        // Keep the Uzbek title as the value (used for filtering) and carry the
        // Russian title for display.
        const cats = [
          { uz: 'All', ru: 'All' },
          ...data.map(cat => ({ uz: cat.title, ru: cat.title_ru || cat.title })),
        ];
        setCategories(cats);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const url = apiUrl(`/startuphunterapp/problems/category/${encodeURIComponent(activeCategory)}/`);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Sections:', data);
        setSections(data);
      })
      .catch(error => console.error('Error:', error));
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="app">
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        categories={categories}
      />
      <Hero />
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <SectionsGrid
        sections={sections}
        activeCategory={activeCategory}
      />
      <Footer />
    </div>
  );
}

export default App;