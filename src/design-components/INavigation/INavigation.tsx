"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const INavigation: React.FC = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navigation = isAdmin
    ? [
        { label: "Home", path: "/" },
        { label: "Tickets", path: "/tickets" },
        { label: "Profile", path: "/profile" },
        { label: "Admin Dashboard", path: "/admin-dashboard" },
      ]
    : isLoggedIn
    ? [
        { label: "Home", path: "/" },
        { label: "Tickets", path: "/tickets" },
        { label: "Profile", path: "/profile" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Tickets", path: "/tickets" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-6 text-white">
        {navigation.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <p className="hover:text-gray-300 transition">{item.label}</p>
            </Link>
          </li>
        ))}
        {isLoggedIn && (
          <li>
            <button
              className="hover:text-gray-300 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default INavigation;
