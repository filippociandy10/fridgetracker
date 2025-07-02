// Base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5175/api';

// Helper function to get auth token from local storage
const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

// Helper function to log the user out (e.g., when token expires)
const logout = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  // Redirect to login page
  window.location.href = '/login';
};

// Generic fetch function with error handling and authentication
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  // Add authentication token to headers if available
  const token = getAuthToken();
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });
    
    // Handle authentication errors (redirect to login)
    if (response.status === 401) {
      logout();
      throw new Error('Your session has expired. Please log in again.');
    }
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `API call failed with status: ${response.status}`,
      }));
      
      throw new Error(error.message || error.error || 'An error occurred');
    }
    
    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      return {};
    }
  } catch (error) {
    console.error(`API Error (${url}):`, error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: (credentials) => fetchAPI('auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  register: (userData) => fetchAPI('auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  getProfile: () => fetchAPI('auth/profile'),
};

// FridgeItems API
export const fridgeItemsAPI = {
  getAll: () => fetchAPI('fridgeItems'),
  getById: (id) => fetchAPI(`fridgeItems/${id}`),
  getExpiring: () => fetchAPI('fridgeItems/expiring'),
  create: (data) => fetchAPI('fridgeItems', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`fridgeItems/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`fridgeItems/${id}`, {
    method: 'DELETE',
  }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => fetchAPI('categories'),
  getById: (id) => fetchAPI(`categories/${id}`),
  create: (data) => fetchAPI('categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => fetchAPI(`categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => fetchAPI(`categories/${id}`, {
    method: 'DELETE',
  }),
};

// Settings API
export const settingsAPI = {
  get: () => fetchAPI('settings'),
  update: (data) => fetchAPI('settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Authentication helpers
export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export { logout };