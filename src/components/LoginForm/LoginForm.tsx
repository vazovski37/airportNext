"use client";

import React, { useState } from "react";
import useLogin from "@/hooks/useLogin";
import SInput from "@/design-components/SInput/SInput";
import SButton from "@/design-components/SButton/SButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error } = useLogin();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(formData);

    if (result) {
      alert("Login successful!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 border border-violet-300 rounded-lg">
      <h2 className="text-xl font-semibold text-black mb-6">შესვლა</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        {error && <p className="text-red-500">{error}</p>}
        <SButton
          type="primary"
          size="lg"
          disabled={loading}
        >
          {loading ? "შესვლა..." : "შესვლა"}
        </SButton>
      </form>
    </div>
  );
};

export default LoginForm;
