'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HeroSection from '@/components/hero/Hero';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import CommonPlaces from '@/components/CommonPlaces/CommonPlaces';
import PurchaseForm from '@/components/PurchaseForm/PurchaseForm';

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic (e.g., clear session)
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex-col  items-top justify-center">
      <HeroSection />
      <HowItWorks />
      <CommonPlaces />

      {/* <PurchaseForm /> */}
    </div>
  );
}
