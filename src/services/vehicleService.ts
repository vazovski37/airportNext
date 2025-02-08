import { apiPost, apiGet, apiPut, apiDelete } from "@/utils/axiosInstance";
import { IVehicle } from "@/interfaces/vehicle";

// Fetch all vehicles
export const fetchVehiclesApi = async (): Promise<IVehicle[]> => {
    return apiGet("/api/vehicles");
};

// Add a new vehicle
export const createVehicleApi = async (data: { vehicle_name: string; vehicle_capacity: number }): Promise<IVehicle> => {
    return apiPost("/api/vehicles", data);
};

// Update an existing vehicle
export const updateVehicleApi = async (id: number, data: { vehicle_name?: string; vehicle_capacity?: number }): Promise<IVehicle> => {
    return apiPut(`/api/vehicles/${id}`, data);
};

// Delete a vehicle
export const deleteVehicleApi = async (id: number): Promise<void> => {
    return apiDelete(`/api/vehicles/${id}`);
};
