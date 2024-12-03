'use client';

import { useRouter } from 'next/navigation';
import RouteCard from '@/components/RouteCard/RouteCard';
import HeroSection from '@/components/hero/Hero';

const TicketsPage = () => {
  const router = useRouter();

  const routes = [
    {
      id: 1,
      departureTime: "5:30",
      arrivalTime: "7:20",
      travelDuration: "1:50სთ",
      departureLocation: "ქუთაისის აეროპორტი",
      arrivalLocation: "ტურიზმის ცენტრი",
      terminalInfo: "1 Terminal",
      price: 31.99,
      transportMode: "Bus",
      features: ["WiFi", "Power"],
    },
    {
      id: 2,
      departureTime: "6:30",
      arrivalTime: "8:20",
      travelDuration: "1:50სთ",
      departureLocation: "თბილისი სადგური",
      arrivalLocation: "ბათუმის ცენტრი",
      terminalInfo: null,
      price: 45.99,
      transportMode: "Plane",
      features: ["WiFi"],
    },
  ];

  const handleSelectRoute = (routeId: number) => {
    router.push(`/purchase/${routeId}`); // Use dynamic route with ID
  };

  return (
    <div className="min-h-screen bg-gray-50 py-0 px-0 flex flex-col gap-8">
        <HeroSection />
      <div className="max-w-3xl w-full mx-auto space-y-6">
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            {...route}
            onSelect={() => handleSelectRoute(route.id)} // Pass route ID to the handler
          />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
