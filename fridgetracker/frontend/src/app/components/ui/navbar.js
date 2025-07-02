'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser, logout } from '@/app/lib/auth';

export default function Navbar() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setUser(getCurrentUser());
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogout = () => {
    logout();
    router.push('/login');
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
            
            {authenticated && (
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
            )}
          </div>
          
          {/* Auth status section - desktop */}
          <div className="hidden sm:flex sm:items-center">
            {authenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Hello, {user?.name || user?.firstName || 'User'}
                </span>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/register" className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
                  Register
                </Link>
              </div>
            )}
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
          {authenticated ? (
            <>
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
            </>
          ) : (
            <div className="py-2 text-center text-gray-500">
              Please log in to access the application
            </div>
          )}
          
          {/* Auth status section - mobile */}
          <div className="border-t border-gray-200 pt-4 pb-2">
            {authenticated ? (
              <>
                <div className="pl-3 pr-4 py-2 text-gray-600">
                  Hello, {user?.name || user?.firstName || 'User'}
                </div>
                <button 
                  onClick={handleLogout}
                  className="block pl-3 pr-4 py-2 text-red-600 hover:text-red-800 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block pl-3 pr-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
                  Login
                </Link>
                <Link href="/register" className="block pl-3 pr-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-800">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}