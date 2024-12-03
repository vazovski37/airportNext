"use client";

import React from 'react';
import Link from 'next/link';
import useAuthStatus from '../../hooks/useAuthStatus';

const INavigation: React.FC = () => {
  const { isLoggedIn, toggleAuthStatus } = useAuthStatus();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-6 text-white">
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/home">
                <p className="hover:text-gray-300 transition">home</p>
              </Link>
            </li>
            <li>
              <Link href="/tickets">
                <p className="hover:text-gray-300 transition">Ticket</p>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <p className="hover:text-gray-300 transition">Profile</p>
              </Link>
            </li>
            <li>
              <button
                className="hover:text-gray-300 transition"
                onClick={toggleAuthStatus}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/tickets">
                <p className="hover:text-gray-300 transition">Ticket</p>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <p className="hover:text-gray-300 transition">Register</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default INavigation;
