# Muammo Ixtier - Frontend Application

A React-based frontend application for displaying startup ideas and problems that people are willing to pay to solve.

## Features

- ✅ **Dynamic Navbar** with dropdown categories and language switcher (UZ/RU/EN)
- ✅ **Hero Section** with green background (placeholder for SVG)
- ✅ **Category Filter System** with active state management
- ✅ **Section Cards Grid** with 3-line description limit
- ✅ **Load More Functionality** - Shows 4 sections initially, loads 4 more on click
- ✅ **Section Detail Page** - Full details when clicking a section
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Footer CTA** with call-to-action buttons

## Tech Stack

- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS Modules** - Component-scoped styling

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will open at `http://localhost:3000`

## Project Structure

```
muammo-ixtier/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation with dropdown & language switcher
│   │   ├── Navbar.css
│   │   ├── Hero.jsx           # Hero section with title
│   │   ├── Hero.css
│   │   ├── Categories.jsx     # Category filter buttons
│   │   ├── Categories.css
│   │   ├── SectionsGrid.jsx   # Grid of section cards
│   │   ├── SectionsGrid.css
│   │   ├── SectionCard.jsx    # Individual section card
│   │   ├── SectionCard.css
│   │   ├── Footer.jsx         # Footer CTA section
│   │   └── Footer.css
│   ├── pages/
│   │   ├── SectionDetail.jsx  # Section detail page
│   │   └── SectionDetail.css
│   ├── App.jsx               # Main app component
│   ├── App.css
│   ├── main.jsx             # Entry point with routing
│   └── index.css            # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Customization Guide

### Adding Your Logo

Replace the logo placeholder in `src/components/Navbar.jsx`:

```jsx
<div className="navbar-logo">
  <svg>
    {/* Add your SVG logo code here */}
  </svg>
</div>
```

### Adding Background Vector

Replace the background placeholder in `src/components/Hero.jsx`:

```jsx
<div className="hero-background">
  <svg>
    {/* Add your green vector SVG here */}
  </svg>
</div>
```

### Connecting to Backend

The application currently uses mock data. To connect to your backend:

1. **Update App.jsx** - Replace mock categories and sections with API calls
2. **Update SectionDetail.jsx** - Fetch section data by ID from your API
3. **Add API service** - Create `src/services/api.js` for API calls

Example API integration:

```javascript
// src/services/api.js
const API_BASE_URL = 'your-api-url';

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

export const fetchSections = async (category) => {
  const response = await fetch(`${API_BASE_URL}/sections?category=${category}`);
  return response.json();
};

export const fetchSectionById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/sections/${id}`);
  return response.json();
};
```

## Key Features Implementation

### Category Filtering
- Click any category button to filter sections
- Active category has black background
- "All" shows all sections from all categories

### Load More
- Initially shows 4 sections
- Clicking "Ko'proq muammolar" loads 4 more
- Button disappears when all sections are shown

### Section Cards
- Description limited to 3 lines with ellipsis
- Clicking card navigates to detail page
- Hover effect for better UX

### Language Switcher
- Supports UZ, RU, EN
- Active language highlighted
- Dropdown closes on selection

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## Color Variables

The application uses CSS variables for easy theming:

```css
--primary-green: #C5F82A
--dark-bg: #1A1A1A
--light-bg: #F5F5F5
--text-dark: #000000
--text-light: #666666
--white: #FFFFFF
```

## Next Steps

1. Add your logo SVG to the navbar
2. Add background vector SVG to hero section
3. Connect to your backend API
4. Implement authentication for "Muammo qo'shish" button
5. Add loading states and error handling
6. Implement search functionality
7. Add pagination or infinite scroll
8. Add filters (date, popularity, etc.)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved
