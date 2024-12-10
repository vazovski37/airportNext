import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

interface NavigationItem {
  label: string;
  path: string;
}

export const useNavigation = () => {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);
  const cookies = parseCookies();

  const isLoggedIn = !!cookies.api_token;
  const isAdmin = cookies.is_admin === "true";

  useEffect(() => {
    // Define navigation items for each state
    const guestNav: NavigationItem[] = [
      { label: "Home", path: "/" },
      { label: "Tickets", path: "/tickets" },
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" },
    ];

    const userNav: NavigationItem[] = [
      { label: "Home", path: "/" },
      { label: "Tickets", path: "/tickets" },
      { label: "Profile", path: "/profile" },
    ];

    const adminNav: NavigationItem[] = [
      { label: "Home", path: "/" },
      { label: "Tickets", path: "/tickets" },
      { label: "Profile", path: "/profile" },
      { label: "Admin Dashboard", path: "/admin-dashboard" },
    ];

    // Determine navigation based on authentication and role
    if (!isLoggedIn) {
      setNavigation(guestNav);
    } else if (isAdmin) {
      setNavigation(adminNav);
    } else {
      setNavigation(userNav);
    }
  }, [isLoggedIn, isAdmin]);

  return { navigation, isLoggedIn, isAdmin };
};
