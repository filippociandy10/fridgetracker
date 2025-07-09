'use client';
import { useState } from 'react';
import Link from 'next/link';
import { fridgesAPI } from '@/app/lib/api';

export default function FridgeList({ fridges: initialFridges }) {
  const [fridges, setFridges] = useState(initialFridges || []);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await fridgesAPI.delete(id);
      setFridges(fridges.filter(fridge => fridge.id !== id));
    } catch (error) {
      console.error('Error deleting fridge:', error);
    } finally {
      setDeletingId(null);
      setConfirmingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {fridges.map((fridge) => (
        <div key={fridge.id} className="border p-4 rounded shadow flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold">{fridge.name}</h2>
            <Link href={`/fridges/${fridge.id}`} className="text-blue-600 underline text-sm">
              View Details
            </Link>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/fridges/edit/${fridge.id}`}
              className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
            >
              Edit
            </Link>

            {confirmingId === fridge.id ? (
              <>
                <button
                  onClick={() => handleDelete(fridge.id)}
                  disabled={deletingId === fridge.id}
                  className="text-red-600 font-medium hover:text-red-800"
                >
                  {deletingId === fridge.id ? 'Deleting...' : 'Confirm Delete'}
                </button>
                <button
                  onClick={() => setConfirmingId(null)}
                  className="text-gray-500 font-medium hover:text-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmingId(fridge.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            )}
          </div>

          {confirmingId === fridge.id && (
            <p className="text-sm text-red-500 mt-2 col-span-2">
              Deleting this fridge will also delete all its items. Continue?
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
