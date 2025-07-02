'use client';

// Helper function to get the current user from localStorage
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

// Helper function to get the auth token
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

// Helper function to check if the user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Helper function to logout
export const logout = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  // Redirect to login page if needed
  window.location.href = '/login';
};

// Helper function to add auth headers to requests
export const authHeader = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Extend the API to include auth token
export const enhanceApi = (api) => {
  const enhancedApi = {};
  
  // Loop through original API methods and enhance them with auth headers
  Object.keys(api).forEach(method => {
    if (typeof api[method] === 'function') {
      enhancedApi[method] = (...args) => {
        // Add auth token to fetch requests
        // Assume the original API will handle the actual fetch calls
        try {
          return api[method](...args);
        } catch (error) {
          // If unauthorized (401), log the user out
          if (error.status === 401) {
            logout();
          }
          throw error;
        }
      };
    }
  });
  
  return enhancedApi;
};