import CategoryForm from "@/app/components/categories/category-form";

export const metadata = {
  title: 'Edit Category - FridgeTracker',
};

export default function EditCategoryPage({ params }) {
  return (
    <div>
      <h1>Edit Category</h1>
      <CategoryForm categoryId={params.id} />
    </div>
  );
}