'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fridgeItemsAPI } from '@/app/lib/api';

export default function ExpiringItems({ fridgeId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        const expiringItems = await fridgeItemsAPI.getExpiring(fridgeId);
        setItems(expiringItems);
      } catch (error) {
        console.error('Error loading expiring items:', error);
      } finally {
        setLoading(false);
      }
    }

    if (fridgeId) {
      loadItems();
    }
  }, [fridgeId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-200 rounded"></div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">No items expiring soon. Great job!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {items.map(item => {
          const daysLeft = Math.ceil(
            (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
          );

          return (
            <li key={item.id} className="p-4 hover:bg-gray-50">
              <Link href={`/fridges/${fridgeId}/items/${item.id}`} className="block">
                <div className="flex justify-between">
                  <p className="font-medium">{item.name}</p>
                  <span className="px-2 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-800">
                    {daysLeft <= 0 ? 'Expired' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <span>{item.category?.name}</span>
                  <span className="mx-2">•</span>
                  <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <Link href={`/fridges/${fridgeId}/items`} className="text-blue-500 hover:underline">
          View all items
        </Link>
      </div>
    </div>
  );
}
