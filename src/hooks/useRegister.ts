import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegistrationData } from "@/interfaces/auth";
import { registerUser } from "@/services/authService";

const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (formData: RegistrationData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      router.push("/login"); // Redirect to login after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || "რეგისტრაცია ვერ შესრულდა.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegistration;
