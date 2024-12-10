import { apiGet } from "@/utils/axiosInstance";
import { ITicket } from "../interfaces/ticket";

// Fetch all tickets
export const fetchTickets = async (): Promise<ITicket[]> => {
  return apiGet("/api/tickets");
};

// If you need to fetch specific ticket details in the future
export const fetchTicketDetails = async (ticketId: number): Promise<ITicket> => {
  return apiGet(`/api/tickets/${ticketId}`);
};
