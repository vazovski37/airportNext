import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, LoginResponse } from "@/interfaces/auth";
import { apiPost } from "@/utils/axiosInstance";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (formData: LoginFormData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await apiPost("/login", formData);

      // Set cookies
      document.cookie = `api_token=${response.token}; path=/; secure; samesite=strict`;
      document.cookie = `is_admin=${response.is_admin}; path=/; secure; samesite=strict`;

      // Redirect based on user role
      router.push(response.is_admin ? "/admin-dashboard" : "/tickets");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
