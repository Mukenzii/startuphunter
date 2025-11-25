# Quick Start Guide

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

## Installation & Setup

### 1. Install Dependencies

```bash
cd muammo-ixtier
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

## What Works Right Now

✅ **Navbar**
- Logo placeholder (add your SVG)
- "Kategoriyalar" dropdown with arrow animation
- Language switcher (UZ/RU/EN) with dropdown
- "Muammo qo'shish" button

✅ **Hero Section**
- Main title and subtitle
- Green background placeholder (add your SVG)

✅ **Categories**
- Dynamic category buttons
- Active state (black background when selected)
- Clicking switches active category

✅ **Sections Grid**
- 4 sections shown by default
- 3-line description limit with ellipsis
- Clicking a card opens detail page

✅ **Load More Button**
- Shows 4 more sections each click
- Hides when all sections displayed

✅ **Section Detail Page**
- Full section details
- Back button to return to main page
- Action buttons

✅ **Footer CTA**
- Call-to-action section
- Two action buttons

## Next Steps

### 1. Add Your Logo

Edit `src/components/Navbar.jsx` line 45:

```jsx
<div className="navbar-logo">
  <svg width="150" height="40" viewBox="0 0 150 40">
    {/* Your logo SVG code here */}
  </svg>
</div>
```

### 2. Add Background Vector

Edit `src/components/Hero.jsx` line 7:

```jsx
<div className="hero-background">
  <svg width="100%" height="100%" viewBox="0 0 1920 1080">
    {/* Your background vector SVG here */}
  </svg>
</div>
```

### 3. Connect to Your Backend

Create `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-api.com/api';

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

export const getSections = async (category = 'All') => {
  const url = category === 'All' 
    ? `${API_BASE_URL}/sections`
    : `${API_BASE_URL}/sections?category=${category}`;
  const response = await fetch(url);
  return response.json();
};

export const getSectionById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/sections/${id}`);
  return response.json();
};
```

Then update `src/App.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { getCategories, getSections } from './services/api';

function App() {
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, sectionsData] = await Promise.all([
          getCategories(),
          getSections()
        ]);
        setCategories(categoriesData);
        setSections(sectionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // ... rest of your code
}
```

## Testing Different Scenarios

### Test Category Filtering
1. Click on different categories
2. Verify sections update
3. Check "All" shows all sections

### Test Load More
1. Scroll to bottom
2. Click "Ko'proq muammolar"
3. Verify 4 more sections appear
4. Button should disappear when all sections shown

### Test Section Detail
1. Click any section card
2. Verify detail page opens
3. Click back button
4. Verify returns to main page

### Test Language Switcher
1. Click language dropdown
2. Select different language
3. Verify language changes (when you implement translations)

## Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Hot Reload Not Working
- Make sure you're saving files
- Check console for errors
- Try restarting dev server

## File Structure Overview

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components (routes)
├── services/         # API calls (to be created)
├── App.jsx           # Main app with routing logic
└── main.jsx          # Entry point
```

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` folder.

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Manual Deployment
1. Run `npm run build`
2. Upload `dist/` folder to your hosting
3. Configure server for SPA routing

## Need Help?

- Check the main README.md for detailed documentation
- Review component files for inline comments
- Check browser console for errors
- Ensure all dependencies are installed

## Development Tips

- Use React DevTools browser extension
- Check Network tab to debug API calls
- Use console.log() for debugging state
- Keep components small and focused
- Follow the existing code style
