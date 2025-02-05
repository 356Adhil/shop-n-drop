import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <LoginForm userType="customer" />
        <LoginForm userType="partner" />
      </div>
    </div>
  );
}