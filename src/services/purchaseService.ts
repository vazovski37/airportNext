import { apiPost } from "@/utils/axiosInstance";
import { IPurchaseData } from "@/interfaces/purchase";

export const purchaseTicket = async (data: IPurchaseData): Promise<void> => {
  return apiPost("/api/purchase", data);
};

// export const purchaseTicket = async (data: IPurchaseData & { ticketId: number }): Promise<void> => {
//   return apiPost("/api/bought-tickets", data);
// };

