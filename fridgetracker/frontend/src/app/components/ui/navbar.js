'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const isActive = (path) => {
    return pathname === path ? 'text-blue-500 font-medium' : 'text-gray-700 hover:text-blue-500';
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                FridgeTracker
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname === '/' ? 'border-blue-500' : 'border-transparent'} ${isActive('/')}`}>
                Dashboard
              </Link>
              <Link href="/fridge-items" className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname.startsWith('/fridge-items') ? 'border-blue-500' : 'border-transparent'} ${isActive('/fridge-items')}`}>
                Fridge Items
              </Link>
              <Link href="/categories" className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname.startsWith('/categories') ? 'border-blue-500' : 'border-transparent'} ${isActive('/categories')}`}>
                Categories
              </Link>
              <Link href="/settings" className={`inline-flex items-center px-1 pt-1 border-b-2 ${pathname === '/settings' ? 'border-blue-500' : 'border-transparent'} ${isActive('/settings')}`}>
                Settings
              </Link>
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" className={`block pl-3 pr-4 py-2 border-l-4 ${pathname === '/' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}>
            Dashboard
          </Link>
          <Link href="/fridge-items" className={`block pl-3 pr-4 py-2 border-l-4 ${pathname.startsWith('/fridge-items') ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}>
            Fridge Items
          </Link>
          <Link href="/categories" className={`block pl-3 pr-4 py-2 border-l-4 ${pathname.startsWith('/categories') ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}>
            Categories
          </Link>
          <Link href="/settings" className={`block pl-3 pr-4 py-2 border-l-4 ${pathname === '/settings' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`}>
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}