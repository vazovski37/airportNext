"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { IAuthState } from "@/interfaces/auth";

interface AuthContextProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  setAuthState: (state: Partial<IAuthState>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState, setAuthState, logout } = useAuthState();

  useEffect(() => {
    // Optional: You can add logic to validate token or re-fetch user details here
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!authState.api_token,
        isAdmin: authState.is_admin,
        setAuthState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};