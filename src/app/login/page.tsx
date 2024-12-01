'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import IButton from '@/design-components/IButton/IButton';
import IInput from '@/design-components/IInput/IInput';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // Your login logic
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">

          <IInput label={'password'} className={''} type={'password'} value={e.target.value} onChange={function (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void {
            console.log(e.target.value);
          } } />
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button>
        </form>
        {/* <div className="mt-4 text-center">
          <Link href="/registration" className="text-blue-600 hover:underline">Don't have an account? Register here</Link>
        </div> */}
        <IButton label='login' type={'transparent'} onClick={function (): void {
          console.log('log');
        } }  />
      </div>
    </div>
  );
}
