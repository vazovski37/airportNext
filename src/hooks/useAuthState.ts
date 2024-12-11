import { useState, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { IAuthState } from "@/interfaces/auth";

export const useAuthState = () => {
  const [authState, setAuthStateInternal] = useState<IAuthState>({
    api_token: null,
    is_admin: false,
  });

  useEffect(() => {
    const cookies = parseCookies();
    setAuthStateInternal({
      api_token: cookies["api_token"] || null,
      is_admin: cookies["is_admin"] === "true",
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

    if (state.is_admin !== undefined) {
      if (state.is_admin !== null) {
        setCookie(null, "is_admin", String(state.is_admin), {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      } else {
        destroyCookie(null, "is_admin");
      }
    }

    setAuthStateInternal((prev) => ({ ...prev, ...state }));
  };

  const logout = () => {
    destroyCookie(null, "api_token");
    destroyCookie(null, "is_admin");
    setAuthStateInternal({
      api_token: null,
      is_admin: false,
    });
  };

  return { authState, setAuthState, logout };
};
