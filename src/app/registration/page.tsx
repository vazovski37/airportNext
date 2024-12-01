'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link'
import IButton from '@/design-components/IButton/IButton';

export default function Registration() {
  const router = useRouter();

  const handleRegister = () => {
    // Your registration logic
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-md" required />
          <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-md" required />
          <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-md" required />
          <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700">Register</button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-teal-600 hover:underline">Already have an account? Login here</Link>
        </div>
      </div>
      <IButton label={''} type={'solid'} onClick={function (): void {
        throw new Error('Function not implemented.');
      } }/>
    </div>
  );
}
