import { apiGet } from "@/utils/axiosInstance";

export const fetchAvailableTickets = async () => {
  const response = await apiGet("/api/tickets");
  return response.data.data;
};

export const fetchTicketById = async (id: number) => {
  const response = await apiGet(`/api/tickets/${id}`);
  return response.data; 
};
