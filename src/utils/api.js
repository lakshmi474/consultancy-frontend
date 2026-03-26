export const getApiUrl = () => {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isLocal 
    ? (import.meta.env.VITE_API_URL || 'http://localhost:5000')
    : 'https://consultancy-project-backend-b890.onrender.com';
};
