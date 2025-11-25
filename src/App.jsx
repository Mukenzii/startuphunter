import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import SectionsGrid from './components/SectionsGrid';
import Footer from './components/Footer';

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [language, setLanguage] = useState('UZ');

  // Mock data for categories - these will come from your backend
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

  // Mock data for sections - these will come from your backend
  const sections = [
    {
      id: 1,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'All'
    },
    {
      id: 2,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'All'
    },
    {
      id: 3,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'All'
    },
    {
      id: 4,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'All'
    },
    {
      id: 5,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'All'
    },
    {
      id: 6,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'All'
    },
    {
      id: 7,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'All'
    },
    {
      id: 8,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'All'
    },
    {
      id: 9,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'No-code'
    },
    {
      id: 10,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'No-code'
    },
    {
      id: 11,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'Marketing va Sotuv'
    },
    {
      id: 12,
      title: 'This section is currently empty',
      description: 'Select products from the catalogue and they will be waiting for you here',
      date: '12.04.2025',
      category: 'Marketing va Sotuv'
    }
  ];

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
