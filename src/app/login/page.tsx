"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm/LoginForm"; // Import your LoginForm component

const Login: React.FC = () => {
  const router = useRouter();


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <LoginForm />
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

export default Login;
