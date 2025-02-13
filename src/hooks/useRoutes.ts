import { useState, useEffect } from "react";
import { fetchRoutesApi, createRouteApi, updateRouteApi, deleteRouteApi } from "@/services/routeService";
import { IRoute } from "@/interfaces/route";

export const useRoutes = () => {
    const [routes, setRoutes] = useState<IRoute[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadRoutes = async () => {
        try {
            setLoading(true);
            const data = await fetchRoutesApi();
            setRoutes(data);
        } catch (err) {
            setError("Failed to fetch routes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRoutes();
    }, []);

    const createRoute = async (routeData: {
        departure_id: number;
        destination_id: number;
        price: number;
        ride_time: number;
    }) => {
        try {
            await createRouteApi(routeData);
            await loadRoutes();
        } catch (err) {
            setError("Failed to create route.");
        }
    };

    // Update an existing route
    const updateRoute = async (id: number, routeData: {
        departure_id?: number;
        destination_id?: number;
        price?: number;
        ride_time?: number;
    }) => {
        try {
            await updateRouteApi(id, routeData);
            await loadRoutes(); // Refresh routes after update
        } catch (err) {
            setError("Failed to update route.");
        }
    };

    // Delete a route
    const deleteRoute = async (id: number) => {
        try {
            await deleteRouteApi(id);
            await loadRoutes(); // Refresh routes after delete
        } catch (err) {
            setError("Failed to delete route.");
        }
    };

    return { routes, loading, error, createRoute, updateRoute, deleteRoute, loadRoutes }; // ✅ Include loadRoutes in the return statement
};
