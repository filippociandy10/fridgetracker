'use client';
import FridgeForm from "@/app/components/fridge/fridge-form";
export default function CreateFridgePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Fridge</h1>
      <FridgeForm />
    </div>
  );
}
