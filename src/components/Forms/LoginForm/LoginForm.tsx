"use client";

import React from "react";
import SInput from "@/design-components/SInput/SInput";
import SButton from "@/design-components/SButton/SButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { LoginFormData } from "@/interfaces/auth";

interface LoginFormProps {
  values: LoginFormData;
  errors: Partial<LoginFormData>;
  loading: boolean;
  serverError?: string | null;
  onChange: (field: keyof LoginFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  values,
  errors,
  loading,
  serverError,
  onChange,
  onSubmit,
}) => (
  <div className="max-w-md mx-auto bg-white p-6 border border-violet-300 rounded-lg">
    <h2 className="text-xl font-semibold text-black mb-6">Login</h2>
    {serverError && <p className="text-red-500">{serverError}</p>}
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <SInput
        placeholder="Email"
        value={values.email}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
        rightAdditionalContent={<FontAwesomeIcon icon={faEnvelope} />}
      />
      <SInput
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={(e) => onChange("password", e.target.value)}
        error={errors.password}
        rightAdditionalContent={<FontAwesomeIcon icon={faKey} />}
      />
      <SButton type="primary" size="lg" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </SButton>
    </form>
  </div>
);

export default LoginForm;
