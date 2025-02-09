import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/axiosInstance";
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

export const fetchLocations = async (query = "") => {
  const response = await apiGet(`/api/locations?search=${query}`);
  console.log(response)
  return response;
};

export const createLocation = async (location_name: string) => {
  const response = await apiPost("/api/locations", { location_name });
  return response;
};

export const updateLocation = async (id: number, location_name: string) => {
  const response = await apiPut(`/api/locations/${id}`, { location_name });
  return response;
};


export const deleteLocation = async (id: number) => {
  await apiDelete(`/api/locations/${id}`);
};
