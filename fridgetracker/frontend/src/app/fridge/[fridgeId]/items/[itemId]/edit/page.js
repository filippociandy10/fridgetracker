import FridgeItemForm from '@/app/components/fridge-items/item-form';

export const metadata = {
  title: 'Edit Item - FridgeTracker',
};

export default async function EditFridgeItemPage({ params }) {
  // Ensure params.id is available before rendering the component
  const itemId = params.id;
  
  // This ensures the params are awaited before the component is rendered
  await new Promise(resolve => setTimeout(resolve, 0));
  
  return (
    <div>
      <h1>Edit Item</h1>
      <FridgeItemForm itemId={itemId} />
    </div>
  );
}