import { useState, useEffect } from "react";
import { fetchAvailableTickets, fetchTicketById } from "@/services/apiService";

export const useTickets = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchAvailableTickets();
        setTickets(data);
        console.log(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  return { tickets, loading, error };
};

export const useTicketById = (id: number) => {
  const [ticket, setTicket] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const data = await fetchTicketById(id);
        setTicket(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch ticket.");
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  return { ticket, loading, error };
};
