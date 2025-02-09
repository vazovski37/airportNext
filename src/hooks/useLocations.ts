import { useState } from "react";
import {
  fetchLocations,
  createLocation,
  updateLocation as updateLocationService,
  deleteLocation as deleteLocationService,
} from "@/services/locationService";

export const useLocations = () => {
  const [locations, setLocations] = useState<{ id: number; location_name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Load all locations or search
  const loadLocations = async (query = "") => {
    setLoading(true);
    try {
      const data = await fetchLocations(query);
      console.log(data)
      setLocations(data);
      setError(null);
    } catch (err) {
      setError("Failed to load locations.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add a new location
  const addLocation = async (location_name: string) => {
    setLoading(true);
    try {
      const newLocation = await createLocation(location_name);
      setLocations((prev) => [...prev, newLocation]);
      setError(null);
      await loadLocations(); // ✅ Ensure fresh data
    } catch (err) {
      setError("Failed to add location.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update an existing location
  const updateExistingLocation = async (id: number, location_name: string) => {
    setLoading(true);
    try {
      const updated = await updateLocationService(id, location_name);
      setLocations((prev) =>
        prev.map((location) =>
          location.id === id ? { ...location, location_name: updated.location_name } : location
        )
      );
      setError(null);
      await loadLocations();
    } catch (err) {
      setError("Failed to update location.");
    } finally {
      setLoading(false);
    }
  };
  

  // 🔹 Delete a location
  const deleteLocation = async (id: number) => {
    setLoading(true);
    try {
      await deleteLocationService(id);
      setLocations((prev) => prev.filter((location) => location.id !== id));
      setError(null);
      await loadLocations(); // ✅ Ensure fresh data
    } catch (err) {
      setError("Failed to delete location.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Search locations
  const searchLocations = async (query: string) => {
    await loadLocations(query);
  };

  return {
    locations,
    loading,
    error,
    addLocation,
    updateExistingLocation,
    deleteLocation,
    searchLocations,
    loadLocations, 
  };
};
