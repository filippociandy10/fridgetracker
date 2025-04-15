'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { categoriesAPI } from '@/app/lib/api';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await categoriesAPI.getAll();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading categories:', error);
        setError('Failed to load categories. Please try again.');
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await categoriesAPI.delete(id);
      // Remove the deleted category from the state
      setCategories(categories.filter(category => category.id !== id));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. It may have items assigned to it.');
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-10 bg-slate-200 rounded w-full mb-4"></div>
      <div className="h-32 bg-slate-200 rounded"></div>
    </div>;
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">No categories found. Add some to organize your fridge items!</p>
          <Link href="/categories/create" className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600">
            Add New Category
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Count
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map(category => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{category.description || 'No description'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{category.itemCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/categories/${category.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </Link>
                      <Link href={`/categories/edit/${category.id}`} className="text-yellow-600 hover:text-yellow-900 mr-4">
                        Edit
                      </Link>
                      
                      {deleteId === category.id ? (
                        <>
                          <button 
                            className="text-red-600 hover:text-red-900 mr-2"
                            onClick={() => handleDelete(category.id)}
                          >
                            Confirm
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => setDeleteId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          className={`${category.itemCount > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-900'}`}
                          onClick={() => category.itemCount === 0 && setDeleteId(category.id)}
                          disabled={category.itemCount > 0}
                          title={category.itemCount > 0 ? "Cannot delete category with items" : "Delete category"}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}