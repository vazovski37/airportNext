import { useEffect, useState } from "react";
import { fetchTickets } from "../services/ticketService";
import { ITicket } from "../interfaces/ticket";

const useTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (err: any) {
        setError(err.message || "Error fetching tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchAllTickets();
  }, []);

  return { tickets, loading, error };
};

export default useTickets;