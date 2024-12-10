"use client";

import React from "react";
import { useTickets } from "@/hooks/useTickets";
import RouteCard from "@/components/RouteCard/RouteCard";

const TicketsList: React.FC = () => {
  const { tickets, loading, error } = useTickets();

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Check if tickets exist and are an array
  if (!tickets || tickets.length === 0) {
    return <p>No tickets available.</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Available Tickets</h1>
      <div className="grid grid-cols-1 gap-6">
        {tickets.map((ticket) => (
          <RouteCard
            key={ticket.id}
            id={ticket.id}
            departureTime={new Date(ticket.departure_time).toLocaleTimeString()}
            arrivalTime={new Date(ticket.arrival_time).toLocaleTimeString()}
            travelDuration={`${Math.floor(ticket.ride_time / 60)}h ${
              ticket.ride_time % 60
            }m`}
            departureLocation={ticket.departure_location}
            terminalInfo={ticket.terminal_info || null}
            arrivalLocation={ticket.arrival_location}
            price={`$${ticket.price}`}
            transportMode={ticket.transport_mode || "Bus"}
            features={ticket.features || []}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketsList;
