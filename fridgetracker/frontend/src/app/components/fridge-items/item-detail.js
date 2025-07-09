'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fridgeItemsAPI } from '@/app/lib/api';

export default function FridgeItemDetail({ fridgeId, itemId }) {
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await fridgeItemsAPI.getById(fridgeId, itemId);
        setItem(data);
      } catch (error) {
        console.error('Error loading item:', error);
        setError('Failed to load the item. It may have been deleted or does not exist.');
      } finally {
        setLoading(false);
      }
    }

    if (fridgeId && itemId) {
      loadItem();
    }
  }, [fridgeId, itemId]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await fridgeItemsAPI.delete(fridgeId, itemId);
      router.push(`/fridges/${fridgeId}/items`);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete the item.');
      setShowConfirmDelete(false);
      setDeleting(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-slate-200 rounded w-full mb-4"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
        <div className="mt-4">
          <Link href={`/fridges/${fridgeId}/items`} className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600">
            Back to Items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-1">{item.name}</h2>
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusClass(item.statusText)}`}>
              {item.statusText}
            </span>
          </div>
          <div>
            {new Date(item.expiryDate) < new Date() ? (
              <div className="bg-red-100 text-red-700 p-2 rounded">
                <span className="font-medium">Expired</span> on {new Date(item.expiryDate).toLocaleDateString()}
              </div>
            ) : (
              <div className="bg-blue-100 text-blue-700 p-2 rounded">
                <span className="font-medium">Expires</span> on {new Date(item.expiryDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Item Details</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p className="mb-2">
                <span className="font-medium">Quantity:</span> {item.quantity} {item.unit}
              </p>
              <p className="mb-2">
                <span className="font-medium">Category:</span> {item.category?.name || 'Uncategorized'}
              </p>
              <p className="mb-2">
                <span className="font-medium">Date Added:</span> {new Date(item.dateAdded).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Storage Location:</span> {item.storageLocation || 'Not specified'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <div className="bg-gray-50 p-4 rounded min-h-24">
              {item.notes ? (
                <p>{item.notes}</p>
              ) : (
                <p className="text-gray-500 italic">No notes for this item.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 flex justify-between">
        <Link href={`/fridges/${fridgeId}/items`} className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-medium hover:bg-gray-300">
          Back to List
        </Link>

        <div className="flex space-x-2">
          <Link href={`/fridges/${fridgeId}/items/${item.id}/edit`} className="px-4 py-2 bg-yellow-500 text-white rounded font-medium hover:bg-yellow-600">
            Edit
          </Link>

          {!showConfirmDelete ? (
            <button 
              onClick={() => setShowConfirmDelete(true)} 
              className="px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600"
            >
              Delete
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
