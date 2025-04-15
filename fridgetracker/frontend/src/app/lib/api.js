// Base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5175/api';

// Generic fetch function with error handling
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}/${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `API call failed with status: ${response.status}`,
    }));
    
    throw new Error(error.message || error.error || 'An error occurred');
  }
  
  return response.json();
}

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