import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/axiosInstance";
import { IRoute } from "@/interfaces/route";

// Fetch all routes
export const fetchRoutesApi = async (): Promise<IRoute[]> => {
    return apiGet("/api/routes");
};

export const createRouteApi = async (data: {
    departure_id: number;
    destination_id: number;
    price: number;
    ride_time: number;
}): Promise<IRoute> => {
    return apiPost("/api/routes", data);
};

// Update an existing route
export const updateRouteApi = async (id: number, data: {
    departure_id?: number;
    destination_id?: number;
    price?: number;
    ride_time?: number;
}): Promise<IRoute> => {
    return apiPut(`/api/routes/${id}`, data);
};

// Delete a route
export const deleteRouteApi = async (id: number): Promise<void> => {
    return apiDelete(`/api/routes/${id}`);
};
