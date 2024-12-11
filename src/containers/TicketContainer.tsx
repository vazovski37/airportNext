"use client";

import React from "react";
import useTickets from "@/hooks/useTickets";
import useUserBoughtTickets from "@/hooks/useUserBoughtTickets";
import useAllBoughtTickets from "@/hooks/useAllBoughtTickets";
import STicketCard from "@/design-components/STicketCard/STicketCard";
import { ITicket } from "@/interfaces/ticket";

type TicketContainerType = "availableTickets" | "userPurchasedTickets" | "allPurchasedTickets";

interface TicketContainerProps {
  type: TicketContainerType;
}

const TicketContainer: React.FC<TicketContainerProps> = ({ type }) => {
  let tickets: ITicket[] | null = null;
  let loading = false;
  let error: string | null = null;

  if (type === "availableTickets") {
    const { tickets: availableTickets, loading: availableLoading, error: availableError } = useTickets();
    tickets = availableTickets;
    loading = availableLoading;
    error = availableError;
  } else if (type === "userPurchasedTickets") {
    const { tickets: userTickets, loading: userLoading, error: userError } = useUserBoughtTickets();
    tickets = userTickets;
    loading = userLoading;
    error = userError;
  } else if (type === "allPurchasedTickets") {
    const { tickets: allTickets, loading: allLoading, error: allError } = useAllBoughtTickets();
    tickets = allTickets;
    loading = allLoading;
    error = allError;
  }

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tickets || tickets.length === 0) {
    return <div>No tickets available.</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">
        {type === "availableTickets" && "Available Tickets"}
        {type === "userPurchasedTickets" && "My Purchased Tickets"}
        {type === "allPurchasedTickets" && "All Purchased Tickets"}
      </h1>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <STicketCard
            mode={type === "availableTickets" ? "available" : "purchased"}
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
            transportMode={ticket.vehicle_name} // Default transport mode as no transportMode field
            passengerName={type !== "availableTickets" ? ticket.passengerName : undefined}
            purchaseDate={type !== "availableTickets" ? ticket.purchaseDate : undefined}
            features={[]} // No features field in provided data
          />
        ))}
      </div>
    </div>
  );
};

export default TicketContainer;
