'use client';
import { useState, useEffect } from 'react';
import { fridgeItemsAPI } from '@/app/lib/api';

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalItems: 0,
    expiringItems: 0,
    expiredItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [allItems, expiringItems] = await Promise.all([
          fridgeItemsAPI.getAll(),
          fridgeItemsAPI.getExpiring(),
        ]);
        
        const currentDate = new Date();
        const expiredItems = allItems.filter(item => 
          new Date(item.expiryDate) < currentDate
        );
        
        setStats({
          totalItems: allItems.length,
          expiringItems: expiringItems.length,
          expiredItems: expiredItems.length,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
        setLoading(false);
      }
    }
    
    loadStats();
  }, []);

  if (loading) {
    return <div className="animate-pulse flex space-x-4">
      <div className="h-20 bg-slate-200 rounded w-full"></div>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500">Total Items</p>
            <p className="text-3xl font-bold">{stats.totalItems}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500">Expiring Soon</p>
            <p className="text-3xl font-bold">{stats.expiringItems}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100 text-red-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500">Expired Items</p>
            <p className="text-3xl font-bold">{stats.expiredItems}</p>
          </div>
        </div>
      </div>
    </div>
  );
}