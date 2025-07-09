'use client'
import Link from 'next/link';
import FridgeList from './fridge-list';

export default function FridgeItemsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Fridge List</h1>
        <Link href="/fridge-items/create" className="btn btn-primary">
          Add New Fridge
        </Link>
      </div>
      
      <FridgeList />
    </div>
  );
}