'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic (e.g., clear session)
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Buy Tickets</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Destination" className="w-full p-3 border border-gray-300 rounded-md" required />
          <input type="date" className="w-full p-3 border border-gray-300 rounded-md" required />
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Search Tickets</button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/profile" className="text-blue-600 hover:underline">Go to Profile</Link>
        </div>
        <button onClick={handleLogout} className="mt-4 w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
      </div>
    </div>
  );
}
