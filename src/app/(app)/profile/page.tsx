'use client';

import TicketContainer from '@/containers/TicketContainer';
import UserInfoContainer from '@/containers/UserInfoContainer';

export default function Profile() {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex flex-col md:flex-row gap-8 p-8 md:p-12">
      {/* Left: Profile Container */}
      <div className="bg-white shadow-md rounded-xl p-8 flex flex-col justify-center items-center w-full md:w-[450px] h-auto border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center tracking-wide">User Profile</h1>
        <UserInfoContainer />
      </div>
      
      {/* Right: User Tickets */}
      <div className="bg-white shadow-md rounded-xl p-8 flex flex-col w-full md:flex-grow border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tickets</h2>
        <TicketContainer type={'userPurchasedTickets'} />
      </div>
    </div>
  );
}
