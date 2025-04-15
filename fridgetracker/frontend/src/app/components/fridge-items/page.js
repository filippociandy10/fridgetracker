import Link from 'next/link';
import FridgeItemList from './item-list';

export const metadata = {
  title: 'Fridge Items - FridgeTracker',
};

export default function FridgeItemsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Fridge Items</h1>
        <Link href="/fridge-items/create" className="btn btn-primary">
          Add New Item
        </Link>
      </div>
      
      <FridgeItemList />
    </div>
  );
}