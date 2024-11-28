'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic (e.g., clear session) 
    
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="space-y-4">
          <p>Welcome to the Admin Dashboard.</p>
          <p>Manage user data, tickets, and more here.</p>
        </div>
        <button onClick={handleLogout} className="mt-6 w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
      </div>
    </div>
  );
}
