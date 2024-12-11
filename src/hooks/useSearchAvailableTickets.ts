import { useState, useEffect } from "react";
import { searchAvailableTickets } from "@/services/ticketService";
import { ITicket } from "@/interfaces/ticket";

interface UseSearchAvailableTickets {
  tickets: ITicket[] | null;
  loading: boolean;
  error: string | null;
  search: (params: { departure_time?: string; departure_location?: string; destination_location?: string }) => Promise<void>;
}

const useSearchAvailableTickets = (): UseSearchAvailableTickets => {
  const [tickets, setTickets] = useState<ITicket[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (params: { departure_time?: string; departure_location?: string; destination_location?: string }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchAvailableTickets(params);
      setTickets(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch tickets.");
      setTickets(null);
    } finally {
      setLoading(false);
    }
  };

  return { tickets, loading, error, search };
};

export default useSearchAvailableTickets;
