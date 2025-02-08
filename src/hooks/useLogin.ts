import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, LoginResponse } from "@/interfaces/auth";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { setCookie } from "nookies"; // ✅ Ensure cookies are updated

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

      const { token, user } = response;
      const { role } = user;

      // ✅ Store authentication details in cookies
      setCookie(null, "api_token", token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      setCookie(null, "role", role, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      // ✅ Update authentication state in AuthProvider
      setAuthState({
        api_token: token,
        role,
      });

      // ✅ Redirect based on role
      let redirectPath = "/tickets"; // Default for passengers
      if (role === "admin") redirectPath = "/admin-dashboard";
      else if (role === "driver") redirectPath = "/driver-dashboard";
      else if (role === "agent") redirectPath = "/agent-dashboard";

      router.push(redirectPath);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.response?.data?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
