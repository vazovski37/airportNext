import { useState, useEffect } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { INavigationItem } from "@/interfaces/navigation";

export const useNavigation = () => {
  const { authState } = useAuthState();
  const { api_token, is_admin } = authState;
  const [navigation, setNavigation] = useState<INavigationItem[]>([]);

  useEffect(() => {
    if (is_admin) {
      setNavigation([
        { label: "Home", path: "/" },
        { label: "Tickets", path: "/tickets" },
        { label: "Profile", path: "/profile" },
        { label: "Admin Dashboard", path: "/admin-dashboard" },
      ]);
    } else if (api_token) {
      setNavigation([
        { label: "Home", path: "/" },
        { label: "Tickets", path: "/tickets" },
        { label: "Profile", path: "/profile" },
      ]);
    } else {
      setNavigation([
        { label: "Home", path: "/" },
        { label: "Tickets", path: "/tickets" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ]);
    }
  }, [api_token, is_admin]);

  return { navigation, isLoggedIn: !!api_token, isAdmin: is_admin };
};
