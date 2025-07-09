'use client';
import { useParams } from 'next/navigation';
import FridgeItemList from './item-list';

export default function FridgeItemListWrapper() {
  const { fridgeId } = useParams();

  return <FridgeItemList fridgeId={fridgeId} />;
}
