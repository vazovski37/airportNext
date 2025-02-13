'use client';

import { useState } from 'react';
import { ITicket } from '@/interfaces/ticket';
import HeroSection from '@/components/hero/Hero';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import CommonPlaces from '@/components/CommonPlaces/CommonPlaces';

export default function Home() {

  const [tickets, setTickets] = useState<ITicket[] | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex-col items-top mt-4 justify-center">
      <HeroSection setTickets={setTickets} />
      <HowItWorks />
      <CommonPlaces />
    </div>
  );
}
