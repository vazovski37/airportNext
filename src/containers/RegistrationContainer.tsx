"use client";

import React from "react";
import useForm from "@/hooks/useForm";
import useRegistration from "@/hooks/useRegister";
import { RegistrationData } from "@/interfaces/auth";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";

const RegistrationContainer: React.FC = () => {
  const { register, loading, error } = useRegistration();

  const { values, errors, handleChange, handleSubmit } = useForm<RegistrationData>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validate: (values) => {
      const errors: Partial<RegistrationData> = {};
      if (!values.first_name) errors.first_name = "სახელი სავალდებულოა";
      if (!values.last_name) errors.last_name = "გვარი სავალდებულოა";
      if (!values.email) errors.email = "ელ-ფოსტა სავალდებულოა";
      if (!values.password) errors.password = "პაროლი სავალდებულოა";
      if (values.password !== values.password_confirmation) {
        errors.password_confirmation = "პაროლები არ ემთხვევა";
      }
      return errors;
    },
    onSubmit: register,
  });

  return (
    <RegistrationForm
      values={values}
      errors={errors}
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
      serverError={error} // Optional for displaying server errors
    />
  );
};

export default RegistrationContainer;
