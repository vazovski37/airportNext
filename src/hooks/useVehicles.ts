import { useState, useEffect } from "react";
import { fetchVehiclesApi, createVehicleApi, updateVehicleApi, deleteVehicleApi } from "@/services/vehicleService";
import { IVehicle } from "@/interfaces/vehicle";

export const useVehicles = () => {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all vehicles
    const loadVehicles = async () => {
        try {
            setLoading(true);
            const data = await fetchVehiclesApi();
            setVehicles(data);
        } catch (err) {
            setError("Failed to fetch vehicles.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVehicles();
    }, []);

    // Create a vehicle
    const createVehicle = async (vehicleData: { vehicle_name: string; vehicle_capacity: number }) => {
        try {
            const newVehicle = await createVehicleApi(vehicleData);
    
            if (!newVehicle || !newVehicle.id) {
                throw new Error("Invalid response from API");
            }
    
            setVehicles((prev) => [...prev, newVehicle]); // ✅ Add new vehicle immediately
    
            return newVehicle; // ✅ Ensure it returns the created vehicle
        } catch (err) {
            setError("Failed to create vehicle.");
        }
    };
    

    // Modify a vehicle
    const modifyVehicle = async (id: number, vehicleData: { vehicle_name: string; vehicle_capacity: number }) => {
        try {
            const updatedVehicle = await updateVehicleApi(id, vehicleData);
            setVehicles((prev) =>
                prev.map((vehicle) => (vehicle.id === id ? updatedVehicle : vehicle))
            ); // ✅ Update UI immediately
        } catch (err) {
            setError("Failed to update vehicle.");
        }
    };

    // Remove a vehicle
    const removeVehicle = async (id: number) => {
        try {
            await deleteVehicleApi(id);
            setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id)); // ✅ Remove immediately
        } catch (err) {
            setError("Failed to delete vehicle.");
        }
    };

    return { vehicles, loading, error, createVehicle, modifyVehicle, removeVehicle };
};
