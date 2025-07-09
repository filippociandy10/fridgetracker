import FridgeItemDetail from "@/app/components/fridge-items/item-detail";

export const metadata = {
  title: 'Item Details - FridgeTracker',
};

export default function FridgeItemDetailPage({ params }) {
  return (
    <div>
      <h1>Item Details</h1>
      <FridgeItemDetail itemId={params.id} />
    </div>
  );
}