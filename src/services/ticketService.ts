import { apiGet } from "@/utils/axiosInstance";
import { ITicket } from "@/interfaces/ticket";

// Fetch all tickets
export const fetchTickets = async (): Promise<ITicket[]> => {
  return apiGet("/api/available-tickets");
};

// Fetch specific ticket details
export const fetchTicketDetails = async (ticketId: number): Promise<ITicket> => {
  return apiGet(`/api/tickets/${ticketId}`);
};

// Fetch all bought tickets
export const fetchAllBoughtTickets = async (): Promise<ITicket[]> => {
  return apiGet("/api/bought-tickets");
};

// Fetch user bought tickets
export const fetchUserBoughtTickets = async (): Promise<ITicket[]> => {
  return apiGet("/api/user/bought-tickets");
};

// Search available tickets
export const searchAvailableTickets = async (
  searchParams: {
    departure_time?: string;
    departure_location?: string;
    destination_location?: string;
  }
): Promise<ITicket[]> => {
  const queryParams = new URLSearchParams(searchParams).toString();
  return apiGet(`/api/available-tickets/search?${queryParams}`);
};
