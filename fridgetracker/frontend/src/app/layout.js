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
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="bg-white shadow-inner py-4 mt-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 sm:px-6 lg:px-8">
            &copy; {new Date().getFullYear()} FridgeTracker
          </div>
        </footer>
      </body>
    </html>
  );
}