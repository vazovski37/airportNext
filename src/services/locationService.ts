import { apiGet } from "@/utils/axiosInstance";
import { ILocation } from "@/interfaces/location";

export const searchLocations = async (
  query: string,
  options?: { signal?: AbortSignal }
): Promise<ILocation[]> => {
  if (!query) {
    throw new Error("Query parameter is required.");
  }

  const response = await apiGet(`/api/locations?query=${encodeURIComponent(query)}`, {
    signal: options?.signal,
  });

  return response;
};
