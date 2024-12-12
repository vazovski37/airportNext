import { useState, useRef } from "react";
import { searchLocations } from "@/services/locationService";
import { ILocation } from "@/interfaces/location";

interface UseSearchLocations {
  locations: ILocation[] | null;
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
}

const useSearchLocations = (): UseSearchLocations => {
  const [locations, setLocations] = useState<ILocation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const search = (query: string) => {
    // Cancel the previous request if it's still active
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (!query) {
      setError("Search query cannot be empty.");
      setLocations(null);
      return;
    }

    setLoading(true);
    setError(null);

    searchLocations(query, { signal: controller.signal })
      .then((result) => {
        setLocations(result);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Request was aborted.");
        } else {
          setError(err.message || "Failed to search locations.");
          setLocations(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { locations, loading, error, search };
};

export default useSearchLocations;
