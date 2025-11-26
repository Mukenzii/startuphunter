# Database Integration Guide

## Expected Backend API Structure

Your backend should provide these endpoints:

### 1. Get All Categories
```
GET /api/categories
```

**Response:**
```json
[
  "All",
  "No-code",
  "Marketing va Sotuv",
  "Retail",
  "HR & Recruitment",
  "Meditsina va Sog'liqni saqlash",
  "Biznes",
  "Logistika",
  "Moliya va buxgalteriya",
  "Huquqshunoslik",
  "Oziq-ovqat",
  "Ta'lim"
]
```

### 2. Get Sections (with optional category filter)
```
GET /api/sections?category=All
GET /api/sections?category=No-code
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Section title here",
    "description": "Section description that will be limited to 3 lines in the UI",
    "date": "12.04.2025",
    "category": "No-code"
  },
  {
    "id": 2,
    "title": "Another section",
    "description": "Another description",
    "date": "13.04.2025",
    "category": "Marketing va Sotuv"
  }
]
```

### 3. Get Section by ID
```
GET /api/sections/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Section title",
  "description": "Short description",
  "fullContent": "Complete detailed content with full HTML or markdown",
  "date": "12.04.2025",
  "category": "No-code",
  "author": "John Doe",
  "views": 150,
  "tags": ["startup", "no-code", "saas"]
}
```

## Frontend Integration

### Step 1: Create API Service

Create `src/services/api.js`:

```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function for API calls
async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Get all categories
export async function getCategories() {
  return fetchAPI('/categories');
}

// Get sections with optional category filter
export async function getSections(category = null) {
  const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  return fetchAPI(`/sections${query}`);
}

// Get single section by ID
export async function getSectionById(id) {
  return fetchAPI(`/sections/${id}`);
}

// Add new section (if you implement this feature)
export async function createSection(sectionData) {
  return fetchAPI('/sections', {
    method: 'POST',
    body: JSON.stringify(sectionData),
  });
}

// Update section
export async function updateSection(id, sectionData) {
  return fetchAPI(`/sections/${id}`, {
    method: 'PUT',
    body: JSON.stringify(sectionData),
  });
}

// Delete section
export async function deleteSection(id) {
  return fetchAPI(`/sections/${id}`, {
    method: 'DELETE',
  });
}
```

### Step 2: Update App.jsx

```javascript
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import SectionsGrid from './components/SectionsGrid';
import Footer from './components/Footer';
import { getCategories, getSections } from './services/api';

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [language, setLanguage] = useState('UZ');
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load sections when category changes
  useEffect(() => {
    loadSections(activeCategory);
  }, [activeCategory]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load categories');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSections = async (category) => {
    try {
      setLoading(true);
      const sectionsData = await getSections(category);
      setSections(sectionsData);
    } catch (err) {
      setError('Failed to load sections');
      console.error('Error loading sections:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  if (loading && categories.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
        loading={loading}
      />
      <Footer />
    </div>
  );
}

export default App;
```

### Step 3: Update SectionDetail.jsx

```javascript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './SectionDetail.css';
import { getSectionById } from '../services/api';

const SectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSection();
  }, [id]);

  const loadSection = async () => {
    try {
      setLoading(true);
      const data = await getSectionById(id);
      setSection(data);
    } catch (err) {
      setError('Failed to load section');
      console.error('Error loading section:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !section) {
    return (
      <div className="error-container">
        <p>{error || 'Section not found'}</p>
        <button onClick={handleBack}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="section-detail-page">
      <Navbar 
        language="UZ"
        onLanguageChange={() => {}}
        categories={[]}
      />
      
      <div className="section-detail-container">
        <button className="back-button" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path 
              d="M12.5 15L7.5 10L12.5 5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Orqaga qaytish
        </button>

        <div className="section-detail-content">
          <div className="section-detail-header">
            <div className="section-detail-meta">
              <span className="section-detail-category">{section.category}</span>
              <span className="section-detail-date">{section.date}</span>
            </div>
            <h1 className="section-detail-title">{section.title}</h1>
          </div>

          <div className="section-detail-body">
            <p className="section-detail-description">{section.description}</p>
            <div 
              className="section-detail-full-content"
              dangerouslySetInnerHTML={{ __html: section.fullContent }}
            />
          </div>

          <div className="section-detail-actions">
            <button className="action-button action-button-primary">
              Muammo ustida ishlash
            </button>
            <button className="action-button action-button-secondary">
              Bog'lanish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
```

### Step 4: Environment Variables

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:8000/api
```

For production:

```env
VITE_API_URL=https://your-production-api.com/api
```

### Step 5: Add Loading States

Add to `src/App.css`:

```css
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: var(--text-light);
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: #d32f2f;
  text-align: center;
  padding: 20px;
}

.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 20px;
}

.error-container button {
  background-color: var(--text-dark);
  color: var(--white);
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 16px;
}
```

## Database Schema Recommendations

### MongoDB Schema Example

```javascript
// Section Schema
const sectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 300
  },
  fullContent: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
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
    ]
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  }
}, {
  timestamps: true
});
```

### PostgreSQL Schema Example

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sections (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  full_content TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  author_id INTEGER REFERENCES users(id),
  views INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE section_tags (
  section_id INTEGER REFERENCES sections(id),
  tag VARCHAR(50) NOT NULL,
  PRIMARY KEY (section_id, tag)
);
```

## Testing the Integration

1. **Start your backend server**
2. **Update VITE_API_URL in .env**
3. **Run the frontend:**
   ```bash
   npm run dev
   ```
4. **Test each endpoint:**
   - Load homepage (tests categories and sections endpoints)
   - Click different categories (tests filtered sections)
   - Click a section card (tests section by ID endpoint)

## Error Handling Tips

- Always show user-friendly error messages
- Log detailed errors to console for debugging
- Implement retry logic for failed requests
- Add loading states for better UX
- Handle edge cases (empty results, network errors, etc.)

## Performance Optimization

- Implement pagination for large datasets
- Add caching for frequently accessed data
- Use React.memo for expensive components
- Implement debouncing for search/filter operations
- Lazy load images in section cards

## Security Considerations

- Never expose API keys in frontend code
- Use environment variables for sensitive data
- Implement rate limiting on backend
- Validate all user inputs
- Use HTTPS in production
- Implement CORS properly on backend
