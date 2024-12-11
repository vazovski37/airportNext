import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, LoginResponse } from "@/interfaces/auth";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuthState } = useAuth();
  const router = useRouter();

  const login = async (formData: LoginFormData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await loginUser(formData);

      // Update authentication state via AuthProvider
      setAuthState({
        api_token: response.token,
        is_admin: response.is_admin ?? false,
      });

      // Redirect based on user role
      const redirectPath = response.is_admin ? "/admin-dashboard" : "/tickets";
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
