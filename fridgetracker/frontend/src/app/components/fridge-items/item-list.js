'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fridgeItemsAPI, categoriesAPI } from '@/app/lib/api';

export default function FridgeItemList({fridgeId}) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    search: '',
    category: '',
    status: ''
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [itemsData, categoriesData] = await Promise.all([
          fridgeItemsAPI.getAll(fridgeId),
          categoriesAPI.getAll()
        ]);
        setItems(itemsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading fridge items:', error);
      } finally {
        setLoading(false);
      }
    }

    if (fridgeId) {
      loadData();
    }
  }, [fridgeId]);

  const filteredItems = items.filter(item => {
    if (filter.search && !item.name.toLowerCase().includes(filter.search.toLowerCase())) return false;
    if (filter.category && item.categoryId !== parseInt(filter.category)) return false;
    if (filter.status) {
      if (filter.status === 'expired' && item.statusText !== 'Expired') return false;
      if (filter.status === 'expiring' && item.statusText !== 'Expiring Soon') return false;
      if (filter.status === 'good' && item.statusText !== 'Good') return false;
    }
    return true;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-10 bg-slate-200 rounded w-full mb-4"></div>
      <div className="h-64 bg-slate-200 rounded"></div>
    </div>;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
              placeholder="Search by name..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="expired">Expired</option>
              <option value="expiring">Expiring Soon</option>
              <option value="good">Good</option>
            </select>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">No items found matching your filters.</p>
          <Link href={`/fridges/${fridgeId}/items/create`} className="btn btn-primary">
            Add New Item
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity} {item.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full
                        ${item.statusText === 'Expired' ? 'bg-red-100 text-red-800' :
                          item.statusText === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'}`}>
                        {item.statusText}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/fridges/${fridgeId}/items/${item.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </Link>
                      <Link href={`/fridges/${fridgeId}/items/edit/${item.id}`} className="text-yellow-600 hover:text-yellow-900">
                        Edit
                      </Link>
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
