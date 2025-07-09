'use client';
import { useParams } from 'next/navigation';
import FridgeForm from '@/app/components/fridge/fridge-form';

export default function EditFridgePage() {
  const { fridgeId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Fridge #{fridgeId}</h1>
      <FridgeForm fridgeId={parseInt(fridgeId)} />
    </div>
  );
}
