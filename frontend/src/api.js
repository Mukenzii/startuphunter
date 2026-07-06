// Central API base URL.
// In production (Vercel) set VITE_API_BASE_URL to your backend's public origin,
// e.g. https://api.startuphunter.example. Falls back to the local dev backend.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Build a full API URL from a path like '/startuphunterapp/categories/'
export const apiUrl = (path) => `${API_BASE_URL}${path}`;
