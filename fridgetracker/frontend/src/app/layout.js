import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/ui/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FridgeTracker',
  description: 'Track your refrigerator contents and reduce food waste',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="bg-white shadow-inner py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 sm:px-6 lg:px-8">
            &copy; {new Date().getFullYear()} FridgeTracker
          </div>
        </footer>
      </body>
    </html>
  );
}