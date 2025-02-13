"use client";

import React, { useState } from "react";
import HeroSection from "@/components/hero/Hero";
import TicketContainer from "@/containers/TicketContainer";
import { ITicket } from "@/interfaces/ticket";

const TicketsPage = () => {
  const [tickets, setTickets] = useState<ITicket[] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-0 px-0 flex flex-col gap-8 mt-4">
      <HeroSection setTickets={setTickets} />
      <div className="max-w-3xl w-full mx-auto space-y-6">
        {tickets ? (
          <TicketContainer type="searchAvailableTickets" tickets={tickets} />
        ) : (
          <TicketContainer type="availableTickets" />
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
