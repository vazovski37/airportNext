import { useState, useEffect } from "react";
import { apiGet } from "@/utils/axiosInstance";
import { IUser } from "@/interfaces/auth";
import { getUserInfo } from "@/services/authService";

export const useFetchUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserInfo();
        setUser(response);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
