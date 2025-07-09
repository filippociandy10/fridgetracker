import FridgeItemForm from "@/app/components/fridge-items/item-form";

export const metadata = {
  title: 'Add New Item - FridgeTracker',
};

export default function CreateFridgeItemPage() {
  return (
    <div>
      <h1>Add New Item</h1>
      <FridgeItemForm/>
    </div>
  );
}