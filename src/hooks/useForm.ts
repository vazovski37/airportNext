import { useState } from "react";

type FormErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => Promise<void>;
}

const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (validate) {
      const validationErrors = validate({ ...values, [field]: value });
      setErrors(validationErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit(values);
      setValues(initialValues);
    } catch (err) {
      console.error("Form submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
