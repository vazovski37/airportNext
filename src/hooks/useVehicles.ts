import { useState, useEffect } from "react";
import { fetchVehiclesApi, createVehicleApi, updateVehicleApi, deleteVehicleApi } from "@/services/vehicleService";
import { IVehicle } from "@/interfaces/vehicle";

export const useVehicles = () => {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ Fetch all vehicles (force refresh)
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

    // ✅ Create a vehicle and immediately refresh UI
    const createVehicle = async (vehicleData: { vehicle_name: string; vehicle_capacity: number }) => {
        try {
            await createVehicleApi(vehicleData);
            await loadVehicles(); // ✅ Fetch latest vehicles after creation
        } catch (err) {
            setError("Failed to create vehicle.");
        }
    };

    // ✅ Modify a vehicle and refresh UI
    const modifyVehicle = async (id: number, vehicleData: { vehicle_name: string; vehicle_capacity: number }) => {
        try {
            await updateVehicleApi(id, vehicleData);
            await loadVehicles(); // ✅ Fetch latest vehicles after update
        } catch (err) {
            setError("Failed to update vehicle.");
        }
    };

    // ✅ Remove a vehicle and refresh UI
    const removeVehicle = async (id: number) => {
        try {
            await deleteVehicleApi(id);
            await loadVehicles(); // ✅ Fetch latest vehicles after deletion
        } catch (err) {
            setError("Failed to delete vehicle.");
        }
    };

    return { vehicles, loading, error, createVehicle, modifyVehicle, removeVehicle };
};
