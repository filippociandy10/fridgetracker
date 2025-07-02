'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categoriesAPI } from '@/app/lib/api';

export default function CategoryDetail({ categoryId }) {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await categoriesAPI.getById(categoryId);
        setCategory(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading category:', error);
        setError('Failed to load the category. It may have been deleted or does not exist.');
        setLoading(false);
      }
    }

    loadCategory();
  }, [categoryId]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await categoriesAPI.delete(categoryId);
      router.push('/categories');
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete the category. It may have items assigned to it.');
      setShowConfirmDelete(false);
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-10 bg-slate-200 rounded w-full mb-4"></div>
      <div className="h-32 bg-slate-200 rounded"></div>
    </div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
        <div className="mt-4">
          <Link href="/categories" className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  const hasItems = category.fridgeItems && category.fridgeItems.length > 0;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
        <p className="text-gray-600 mb-4">{category.description || 'No description provided'}</p>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Items in this Category</h3>
          
          {hasItems ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {category.fridgeItems.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.quantity} {item.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{new Date(item.expiryDate).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.statusText === 'Expired' ? 'bg-red-100 text-red-800' : 
                            item.statusText === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {item.statusText}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/fridge-items/${item.id}`} className="text-blue-600 hover:text-blue-900">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No items in this category.</p>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 flex justify-between">
        <Link href="/categories" className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300">
          Back to List
        </Link>
        
        <div className="flex space-x-2">
          <Link href={`/categories/edit/${category.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded font-medium hover:bg-yellow-600">
            Edit
          </Link>
          
          {!hasItems && !showConfirmDelete ? (
            <button 
              onClick={() => setShowConfirmDelete(true)} 
              className="px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600"
            >
              Delete
            </button>
          ) : !hasItems && showConfirmDelete ? (
            <>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 bg-red-600 text-white rounded font-medium hover:bg-red-700 disabled:opacity-50"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
              <button 
                onClick={() => setShowConfirmDelete(false)} 
                className="px-4 py-2 bg-gray-500 text-white rounded font-medium hover:bg-gray-600"
                disabled={deleting}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              className="px-4 py-2 bg-gray-400 text-white rounded font-medium cursor-not-allowed" 
              disabled
              title="Cannot delete category with items"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}