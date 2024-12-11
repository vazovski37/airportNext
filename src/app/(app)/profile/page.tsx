'use client';

import TicketContainer from '@/containers/TicketContainer';
import UserInfoContainer from '@/containers/UserInfoContainer';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic (e.g., clear session)
    router.push('/login');
  };

  return (
    <div className="bg-gray-50 flex-row items-center justify-center">
      <UserInfoContainer />
      <TicketContainer type={'userPurchasedTickets'} />
    </div>
  );
}
