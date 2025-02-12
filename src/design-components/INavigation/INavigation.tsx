"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTicketAlt,
  faUser,
  faUserShield,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const INavigation: React.FC = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  const navigation = isAdmin
    ? [
        { label: "Tickets", path: "/tickets", icon: faTicketAlt },
        { label: "Profile", path: "/profile", icon: faUser },
        { label: "Admin Dashboard", path: "/admin-dashboard", icon: faUserShield },
      ]
    : isLoggedIn
    ? [
        { label: "Tickets", path: "/tickets", icon: faTicketAlt },
        { label: "Profile", path: "/profile", icon: faUser },
      ]
    : [
        { label: "Tickets", path: "/tickets", icon: faTicketAlt },
        { label: "Login", path: "/login", icon: faSignInAlt },
        // { label: "Register", path: "/register", icon: faUserPlus },
      ];

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left Side - Logo (Redirects to Home) */}
      <Link href="/">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
            pathname === "/"
              ? "bg-gray-100 text-black font-semibold"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <FontAwesomeIcon icon={faHome} className="h-5 w-5 text-gray-500" />
          <span>Home</span>
        </div>
      </Link>

      {/* Right Side - Other Routes */}
      <ul className="flex space-x-6">
        {navigation.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                  pathname === item.path
                    ? "bg-gray-100 text-black font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="h-5 w-5 text-gray-500" />
                {item.label}
              </div>
            </Link>
          </li>
        ))}
        {isLoggedIn && (
          <li>
            <button
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-500 transition"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 text-gray-500" />
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default INavigation;
