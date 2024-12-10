"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RegistrationContainer from "@/containers/RegistrationContainer";

const Register: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <RegistrationContainer />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              className="text-violet-600 font-medium hover:underline"
              onClick={() => router.push("/login")} // Navigate to the login page
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;