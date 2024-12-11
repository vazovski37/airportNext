import { useEffect, useState } from "react";
import { fetchTicketDetails } from "@/services/ticketService";
import { ITicket } from "@/interfaces/ticket";

const useTicketDetails = (ticketId: number) => {
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchTicketDetails(ticketId);
        setTicket(data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch ticket details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [ticketId]);

  return { ticket, loading, error };
};

export default useTicketDetails;
