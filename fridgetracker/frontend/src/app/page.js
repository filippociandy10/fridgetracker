import Link from 'next/link';
import DashboardStats from './components/dashboard/dashboard-stats';
import RecentItems from './components/fridge-items/recent-items';
import ExpiringItems from './components/fridge-items/expiring-items';

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1>Dashboard</h1>
        <Link href="/fridge-items/create" className="btn btn-primary -mt-5">
          Add New Item
        </Link>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h2>Recent Items</h2>
          <RecentItems />
        </div>
        
        <div>
          <h2>Expiring Soon</h2>
          <ExpiringItems />
        </div>
      </div>
    </div>
  );
}