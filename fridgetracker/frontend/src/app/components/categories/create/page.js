import CategoryForm from "../category-form";
export const metadata = {
  title: 'Create Category - FridgeTracker',
};

export default function CreateCategoryPage() {
  return (
    <div>
      <h1>Create New Category</h1>
      <CategoryForm />
    </div>
  );
}