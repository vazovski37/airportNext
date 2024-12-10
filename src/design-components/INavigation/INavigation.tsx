"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNavigation } from "@/hooks/useNavigation";
import { destroyCookie } from "nookies";

const INavigation: React.FC = () => {
  const { navigation, isLoggedIn } = useNavigation();
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "api_token");
    destroyCookie(null, "is_admin");
    router.push("/login");
  };

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
