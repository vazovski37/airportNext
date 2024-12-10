"use client";

import React from "react";
import useForm from "@/hooks/useForm";
import useLogin from "@/hooks/useLogin";
import { LoginFormData } from "@/interfaces/auth";
import LoginForm from "@/components/LoginForm/LoginForm";

const LoginContainer: React.FC = () => {
  const { login, loading, error } = useLogin();

  const { values, errors, handleChange, handleSubmit } = useForm<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<LoginFormData> = {};
      if (!values.email) errors.email = "Email is required.";
      if (!values.password) errors.password = "Password is required.";
      return errors;
    },
    onSubmit: login, // Calls the login function from the hook
  });

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <LoginForm
        values={values}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        serverError={error} // Displays the server error if any
      />
    </div>
  );
};

export default LoginContainer;
