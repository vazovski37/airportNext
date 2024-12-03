"use client";

import { useState, useEffect } from 'react';

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
  }, []);

  const toggleAuthStatus = () => {
    setIsLoggedIn((prev) => {
      const newStatus = !prev;
      localStorage.setItem('isLoggedIn', String(newStatus));
      return newStatus;
    });
  };

  return { isLoggedIn, toggleAuthStatus };
};

export default useAuthStatus;
