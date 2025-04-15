import Link from 'next/link';
import CategoryList from '../components/categories/category-list';

export const metadata = {
  title: 'Categories - FridgeTracker',
};

export default function CategoriesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Categories</h1>
        <Link href="/categories/create" className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600">
          Add New Category
        </Link>
      </div>
      
      <CategoryList />
    </div>
  );
}