"use client";

import React from "react";
import SInput from "@/design-components/SInput/SInput";
import SButton from "@/design-components/SButton/SButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { RegistrationData } from "@/interfaces/auth";

interface RegistrationFormProps {
  values: RegistrationData;
  errors: Partial<RegistrationData>;
  loading: boolean;
  serverError?: string | null;
  onChange: (field: keyof RegistrationData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  values,
  errors,
  loading,
  serverError,
  onChange,
  onSubmit,
}) => (
  <div className="max-w-md mx-auto bg-white p-6 border border-violet-300 rounded-lg">
    <h2 className="text-xl font-semibold text-black mb-6">რეგისტრაცია</h2>
    {serverError && <p className="text-red-500">{serverError}</p>}
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <SInput
        placeholder="სახელი"
        value={values.first_name}
        onChange={(e) => onChange("first_name", e.target.value)}
        error={errors.first_name}
        rightAdditionalContent={<FontAwesomeIcon icon={faUser} />}
      />
      <SInput
        placeholder="გვარი"
        value={values.last_name}
        onChange={(e) => onChange("last_name", e.target.value)}
        error={errors.last_name}
        rightAdditionalContent={<FontAwesomeIcon icon={faUser} />}
      />
      <SInput
        placeholder="ელ-ფოსტა"
        value={values.email}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
        rightAdditionalContent={<FontAwesomeIcon icon={faEnvelope} />}
      />
      <SInput
        type="password"
        placeholder="პაროლი"
        value={values.password}
        onChange={(e) => onChange("password", e.target.value)}
        error={errors.password}
        rightAdditionalContent={<FontAwesomeIcon icon={faKey} />}
      />
      <SInput
        type="password"
        placeholder="გაიმეორეთ პაროლი"
        value={values.password_confirmation}
        onChange={(e) => onChange("password_confirmation", e.target.value)}
        error={errors.password_confirmation}
        rightAdditionalContent={<FontAwesomeIcon icon={faKey} />}
      />
      <SButton type="primary" size="lg" disabled={loading}>
        {loading ? "რეგისტრაცია..." : "რეგისტრაცია"}
      </SButton>
    </form>
  </div>
);

export default RegistrationForm;
