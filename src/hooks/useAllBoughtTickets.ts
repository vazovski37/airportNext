import { useEffect, useState } from "react";
import { fetchAllBoughtTickets } from "@/services/ticketService";
import { ITicket } from "@/interfaces/ticket";

const useAllBoughtTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const allTickets = await fetchAllBoughtTickets();
        setTickets(allTickets);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch all bought tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
};

export default useAllBoughtTickets;
