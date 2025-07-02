'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { categoriesAPI } from '@/app/lib/api';

export default function CategoryForm({ categoryId }) {
  const router = useRouter();
  const isEditMode = !!categoryId;
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategory() {
      if (isEditMode) {
        try {
          const data = await categoriesAPI.getById(categoryId);
          setFormData({
            id: data.id,
            name: data.name,
            description: data.description || ''
          });
          setLoading(false);
        } catch (error) {
          console.error('Error loading category:', error);
          setError('Failed to load category. It may have been deleted.');
          setLoading(false);
        }
      }
    }

    loadCategory();
  }, [categoryId, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      if (isEditMode) {
        await categoriesAPI.update(categoryId, formData);
      } else {
        await categoriesAPI.create(formData);
      }
      
      router.push('/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      setError('An error occurred while saving. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-10 bg-slate-200 rounded w-full mb-4"></div>
      <div className="h-32 bg-slate-200 rounded"></div>
    </div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Category name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Category description"
          ></textarea>
        </div>
        
        <div className="flex justify-between">
          <Link href="/categories" className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300">
            Cancel
          </Link>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
}