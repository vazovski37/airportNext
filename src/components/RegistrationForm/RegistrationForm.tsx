"use client";

import React, { useState } from "react";
import useRegister from "@/hooks/useRegister";
import SInput from "@/design-components/SInput/SInput";
import SButton from "@/design-components/SButton/SButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, loading, error } = useRegister();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await register(formData);
    if (result) {
      alert("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 border border-violet-300 rounded-lg">
      <h2 className="text-xl font-semibold text-black mb-6">რეგისტრაცია</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <SInput
          placeholder="სახელი"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          rightAdditionalContent={<FontAwesomeIcon icon={faUser} />}
        />
        <SInput
          placeholder="გვარი"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          rightAdditionalContent={<FontAwesomeIcon icon={faUser} />}
        />
        <SInput
          placeholder="ელ-ფოსტა"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          rightAdditionalContent={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <SInput
          type="password"
          placeholder="პაროლი"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          rightAdditionalContent={<FontAwesomeIcon icon={faKey} />}
        />
        <SInput
          type="password"
          placeholder="გაიმეორეთ პაროლი"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          rightAdditionalContent={<FontAwesomeIcon icon={faKey} />}
        />
        {error && <p className="text-red-500">{error}</p>}
        <SButton
          type="primary"
          size="lg"
          disabled={loading}
        >
          {loading ? "რეგისტრაცია..." : "რეგისტრაცია"}
        </SButton>
      </form>
    </div>
  );
};

export default RegistrationForm;
