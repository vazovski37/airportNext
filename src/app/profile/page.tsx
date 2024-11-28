'use client';

import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic (e.g., clear session)
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Profile</h1>
        <div className="space-y-4">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
        </div>
        <button onClick={handleLogout} className="mt-6 w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
      </div>
    </div>
  );
}
