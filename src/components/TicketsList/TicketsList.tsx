"use client";

import { useTickets } from "@/hooks/useTickets";
import React from "react";
import RouteCard from "../RouteCard/RouteCard";

const TicketList: React.FC = () => {
  const { tickets, loading, error } = useTickets();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!tickets || tickets.length === 0) {
    return <div>No tickets available at the moment.</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Available Tickets</h1>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <RouteCard
            key={ticket.id}
            id={ticket.id}
            departureTime={new Date(ticket.departure_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            arrivalTime={new Date(ticket.arrival_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            travelDuration={`${Math.floor(ticket.travel_duration / 60)}h ${
              ticket.travel_duration % 60
            }m`}
            departureLocation={ticket.departure_location}
            terminalInfo={null} // No terminal info in provided data
            arrivalLocation={ticket.destination_location}
            price={`$${ticket.price}`}
            transportMode={"Bus"} // Default transport mode as no transportMode field
            features={[]} // No features field in provided data
          />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
