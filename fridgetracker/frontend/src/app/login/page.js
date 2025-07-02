import LoginForm from '@/app/components/auth/login-form';

export const metadata = {
  title: 'Login - FridgeTracker',
};

export default function LoginPage() {
  return (
    <div className="py-10">
      <h1 className="text-center mb-8">Login to FridgeTracker</h1>
      <LoginForm />
    </div>
  );
}