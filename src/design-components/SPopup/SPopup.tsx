"use client";
import { useEffect, useState } from "react";
import SButton from "@/design-components/SButton/SButton";
import SInput from "@/design-components/SInput/SInput";

interface SPopupProps {
  isOpen: boolean;
  title: string;
  placeholder: string;
  confirmText: string;
  type: "password" | "name";
  onConfirm: (value: string) => void;
  onClose: () => void;
}

export default function SPopup({
  isOpen,
  title,
  placeholder,
  confirmText,
  type,
  onConfirm,
  onClose,
}: SPopupProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen) setInputValue("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <SInput
          type={type === "password" ? "password" : "text"}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end mt-4 space-x-2">
          <SButton type="secondaryGray" onClick={onClose}>
            Cancel
          </SButton>
          <SButton type="primary" onClick={() => onConfirm(inputValue)}>
            {confirmText}
          </SButton>
        </div>
      </div>
    </div>
  );
}
