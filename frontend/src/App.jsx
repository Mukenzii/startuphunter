import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import SectionsGrid from './components/SectionsGrid';
import Footer from './components/Footer';

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [language, setLanguage] = useState('UZ');
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);

  // Fetch categories once on mount
  useEffect(() => {
    fetch('http://localhost:8000/startuphunterapp/categories/')
      .then(response => response.json())
      .then(data => {
        const categoryNames = ['All', ...data.map(cat => cat.title)];
        setCategories(categoryNames);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const url = `http://localhost:8000/startuphunterapp/problems/category/${encodeURIComponent(activeCategory)}/`;

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