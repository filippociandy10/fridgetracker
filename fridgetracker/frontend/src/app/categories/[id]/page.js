import CategoryDetail from '@/components/categories/category-detail';

export const metadata = {
  title: 'Category Details - FridgeTracker',
};

export default function CategoryDetailPage({ params }) {
  return (
    <div>
      <h1>Category Details</h1>
      <CategoryDetail categoryId={params.id} />
    </div>
  );
}