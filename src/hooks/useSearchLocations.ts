import { useState } from "react";
import { searchLocations} from "@/services/locationService";
import { ILocation } from "@/interfaces/location";


interface UseSearchLocations {
  locations: ILocation[] | null;
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

const useSearchLocations = (): UseSearchLocations => {
  const [locations, setLocations] = useState<ILocation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query) {
      setError("Search query cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchLocations(query);
      setLocations(result);
    } catch (err: any) {
      setError(err.message || "Failed to search locations.");
      setLocations(null);
    } finally {
      setLoading(false);
    }
  };

  return { locations, loading, error, search };
};

export default useSearchLocations;
