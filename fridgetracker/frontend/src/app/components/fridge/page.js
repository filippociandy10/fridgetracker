import Link from 'next/link';
import FridgeList from './fridge-list'; // This can still be a client component

export const metadata = {
  title: 'Fridges - FridgeTracker',
};

export default function FridgePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Fridge List</h1>
        <Link href="/fridges/create" className="btn btn-primary">
          Add New Fridge
        </Link>
      </div>

      <FridgeList />
    </div>
  );
}
