'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { fridgeItemsAPI } from '@/app/lib/api';

export default function RecentItems() {
  const { fridgeId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        const allItems = await fridgeItemsAPI.getAll(fridgeId);
        const recent = allItems
          .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
          .slice(0, 5);
        setItems(recent);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recent items:', error);
        setLoading(false);
      }
    }

    if (fridgeId) {
      loadItems();
    }
  }, [fridgeId]);

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-200 rounded"></div>
      ))}
    </div>;
  }

  if (items.length === 0) {
    return <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-500">No items in your fridge yet.</p>
      <Link href={`/fridges/${fridgeId}/items/create`} className="mt-2 inline-block text-blue-500">
        Add your first item
      </Link>
    </div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {items.map(item => (
          <li key={item.id} className="p-4 hover:bg-gray-50">
            <Link href={`/fridges/${fridgeId}/items/${item.id}`} className="block">
              <div className="flex justify-between">
                <p className="font-medium">{item.name}</p>
                <StatusBadge status={item.statusText} />
              </div>
              <div className="text-sm text-gray-500 mt-1">
                <span>{item.category?.name}</span>
                <span className="mx-2">•</span>
                <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <Link href={`/fridges/${fridgeId}/items`} className="text-blue-500 hover:underline">
          View all items
        </Link>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let badgeClass = '';
  
  switch (status) {
    case 'Expired':
      badgeClass = 'bg-red-100 text-red-800';
      break;
    case 'Expiring Soon':
      badgeClass = 'bg-yellow-100 text-yellow-800';
      break;
    case 'Good':
      badgeClass = 'bg-green-100 text-green-800';
      break;
    default:
      badgeClass = 'bg-gray-100 text-gray-800';
  }

  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${badgeClass}`}>
      {status}
    </span>
  );
}
