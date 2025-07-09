'use client';
import { useParams } from 'next/navigation';
import FridgeItemForm from '@/app/components/fridge-items/item-form';
export default function CreateFridgeItemPage() {
  const { fridgeId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Item to Fridge #{fridgeId}</h1>
      <FridgeItemForm fridgeId={parseInt(fridgeId)} />
    </div>
  );
}
