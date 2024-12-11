import { useEffect, useState } from "react";
import { fetchUserBoughtTickets } from "@/services/ticketService";
import { ITicket } from "@/interfaces/ticket";

const useUserBoughtTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const userTickets = await fetchUserBoughtTickets();
        setTickets(userTickets);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user bought tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
};

export default useUserBoughtTickets;
