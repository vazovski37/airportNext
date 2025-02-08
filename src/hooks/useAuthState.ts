import { useState, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { IAuthState } from "@/interfaces/auth";
import { logoutUser } from "@/services/authService";

type UserRole = "admin" | "agent" | "passenger" | "driver" | null; // ✅ Define allowed roles

export const useAuthState = () => {
  const [authState, setAuthStateInternal] = useState<IAuthState>({
    api_token: null,
    role: null,
  });

  useEffect(() => {
    const cookies = parseCookies();
    const role = cookies["role"] as UserRole; // ✅ Explicitly cast role to UserRole

    setAuthStateInternal({
      api_token: cookies["api_token"] || null,
      role: role || null, 
    });
  }, []);

  const setAuthState = (state: Partial<IAuthState>) => {
    if (state.api_token !== undefined) {
      if (state.api_token) {
        setCookie(null, "api_token", state.api_token, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      } else {
        destroyCookie(null, "api_token");
      }
    }

    if (state.role !== undefined) {
      if (state.role && ["admin", "agent", "passenger", "driver"].includes(state.role)) {
        setCookie(null, "role", state.role, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      } else {
        destroyCookie(null, "role");
      }
    }

    setAuthStateInternal((prev) => ({ ...prev, ...state }));
  };

  const logout = () => {
    destroyCookie(null, "api_token");
    destroyCookie(null, "role");
    setAuthStateInternal({
      api_token: null,
      role: null,
    });

    logoutUser()

  };

  return { authState, setAuthState, logout };
};
