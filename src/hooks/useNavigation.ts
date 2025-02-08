import { useState, useEffect } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { INavigationItem } from "@/interfaces/navigation";

export const useNavigation = () => {
  const { authState } = useAuthState();
  const { api_token, role } = authState; // ✅ Changed `is_admin` to `role`
  const [navigation, setNavigation] = useState<INavigationItem[]>([]);

  useEffect(() => {
    if (!api_token) {
      // ✅ User not logged in
      setNavigation([
        { label: "Home", path: "/" },
        { label: "Tickets", path: "/tickets" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ]);
    } else {
      // ✅ Default navigation for logged-in users
      const userNavigation: INavigationItem[] = [
        { label: "Home", path: "/" },
        { label: "Tickets", path: "/tickets" },
        { label: "Profile", path: "/profile" },
      ];

      // ✅ Add role-specific navigation
      if (role === "admin") {
        userNavigation.push({ label: "Admin Dashboard", path: "/admin-dashboard" });
      } else if (role === "driver") {
        userNavigation.push({ label: "Driver Dashboard", path: "/driver-dashboard" });
      } else if (role === "agent") {
        userNavigation.push({ label: "Agent Dashboard", path: "/agent-dashboard" });
      }

      setNavigation(userNavigation);
    }
  }, [api_token, role]); // ✅ Trigger updates when `role` changes

  return {
    navigation,
    isLoggedIn: !!api_token,
    isAdmin: role === "admin", // ✅ Admin check based on role
    isDriver: role === "driver",
    isAgent: role === "agent",
    isPassenger: role === "passenger",
  };
};
