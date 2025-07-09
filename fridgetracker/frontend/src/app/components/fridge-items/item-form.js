'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fridgeItemsAPI, categoriesAPI } from '@/app/lib/api';

export default function FridgeItemForm({ itemId, fridgeId }) {
  const router = useRouter();
  const isEditMode = !!itemId;
  
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    unit: 'piece',
    categoryId: '',
    expiryDate: '',
    storageLocation: '',
    notes: '',
    fridgeId: fridgeId || '' 
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const categoriesData = await categoriesAPI.getAll();
        setCategories(categoriesData);
        
        if (isEditMode) {
          const itemData = await fridgeItemsAPI.getById(itemId);
          setFormData({
            id: itemData.id,
            name: itemData.name,
            quantity: itemData.quantity,
            unit: itemData.unit || 'piece',
            categoryId: itemData.categoryId || '',
            expiryDate: new Date(itemData.expiryDate).toISOString().split('T')[0],
            storageLocation: itemData.storageLocation || '',
            notes: itemData.notes || '',
            fridgeId: itemData.fridgeId
          });
        } else {
          // Set default expiry date to 7 days from now for new items
          const defaultDate = new Date();
          defaultDate.setDate(defaultDate.getDate() + 7);
          setFormData(prev => ({
            ...prev,
            expiryDate: defaultDate.toISOString().split('T')[0]
          }));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading form data:', error);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    }

    loadData();
  }, [itemId, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Item name is required');
      return;
    }
    
    if (!formData.expiryDate) {
      setError('Expiry date is required');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Create a copy of the form data for submission
      const dataToSubmit = { ...formData };
      
      // Make sure categoryId is a number if provided
      if (dataToSubmit.categoryId) {
        dataToSubmit.categoryId = parseInt(dataToSubmit.categoryId, 10);
      }
      
      console.log('Submitting data:', dataToSubmit);
      
      if (isEditMode) {
        await fridgeItemsAPI.update(itemId, dataToSubmit);
      } else {
        await fridgeItemsAPI.create(dataToSubmit);
      }
      
      router.push('/fridge-items');
    } catch (error) {
      console.error('Error saving item:', error);
      setError(`An error occurred while saving: ${error.message || 'Please check your connection and try again.'}`);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Item name"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="piece">Piece</option>
                  <option value="kg">Kg</option>
                  <option value="g">g</option>
                  <option value="l">L</option>
                  <option value="ml">ml</option>
                  <option value="package">Package</option>
                  <option value="box">Box</option>
                  <option value="can">Can</option>
                  <option value="bottle">Bottle</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select Category --</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <label htmlFor="storageLocation" className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
              <select
                id="storageLocation"
                name="storageLocation"
                value={formData.storageLocation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select Location --</option>
                <option value="Fridge">Fridge</option>
                <option value="Freezer">Freezer</option>
                <option value="Pantry">Pantry</option>
                <option value="Counter">Counter</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional notes..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Link href="/fridge-items" className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300">
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