// containers/Login.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LoginContainer from "@/containers/LoginContainer";

const LoginPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <div className="w-fit h-fit bg-white shadow-md rounded-lg p-6">
        <LoginContainer />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              className="text-violet-600 font-medium hover:underline"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
