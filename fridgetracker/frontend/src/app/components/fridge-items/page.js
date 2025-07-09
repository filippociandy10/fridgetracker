'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import FridgeItemList from './item-list';

export const metadata = {
  title: 'Fridge Items - FridgeTracker',
};

export default function FridgeItemsPage() {
  const { fridgeId } = useParams();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Fridge Items</h1>
        <Link href={`/fridges/${fridgeId}/items/create`} className="btn btn-primary">
          Add New Item
        </Link>
      </div>

      <FridgeItemList />
    </div>
  );
}
