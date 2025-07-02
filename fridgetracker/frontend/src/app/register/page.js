import RegisterForm from '@/app/components/auth/register-form';

export const metadata = {
  title: 'Register - FridgeTracker',
};

export default function RegisterPage() {
  return (
    <div className="py-10">
      <h1 className="text-center mb-8">Create a FridgeTracker Account</h1>
      <RegisterForm />
    </div>
  );
}