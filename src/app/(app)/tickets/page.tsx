'use client';

import { useRouter } from 'next/navigation';
import RouteCard from '@/components/RouteCard/RouteCard';
import HeroSection from '@/components/hero/Hero';
import TicketsList from '@/components/TicketsList/TicketsList';

const TicketsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-0 px-0 flex flex-col gap-8">
        <HeroSection />
      <div className="max-w-3xl w-full mx-auto space-y-6">
          <TicketsList />
      </div>
    </div>
  );
};

export default TicketsPage;