import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface ISInputProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconProp;
  label?: string;
  placeholder?: string;
  helperText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  disabled?: boolean;
  error?: string;
  value?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  id?: string;
  rightAdditionalContent?: React.ReactNode;
}

function SInput({
  icon,
  label,
  placeholder,
  helperText,
  inputProps,
  disabled,
  error,
  type = "text",
  value,
  rightAdditionalContent,
  onChange,
  onKeyDown,
  id,
  ...props
}: ISInputProps) {
  return (
    <div {...props}>
      {label && (
        <label className="text-sm-m font-medium text-gray-700">{label}</label>
      )}
      <div className={`relative rounded-md shadow-xs ${label && "mt-[6px]"}`}>
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[12px] text-gray-500">
            <FontAwesomeIcon fontSize={"16px"} icon={icon} />
          </div>
        )}
        <input
          disabled={disabled}
          type={type}
          id={id}
          className={`
            outline-none
            w-full rounded-[8px] ${icon ? "pl-[40px]" : "pl-[12px]"} pr-[36px] py-[8px] border-[1px] 
            ${error ? "border-error-300" : "border-gray-300"} text-gray-900 
            placeholder:text-gray-500 ${error ? "focus-visible:border-error-400" : "focus-visible:border-gray-400"} 
            disabled:bg-gray-50
            `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          {...inputProps}
          style={type === "date" ? { appearance: "none" } : undefined} // Fallback for non-Tailwind usage
        />
        {rightAdditionalContent && (
          <div className="absolute top-[50%] translate-y-[-50%] right-[12px]">
            {rightAdditionalContent}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p
          className={`text-sm ${
            error ? "text-error-500" : "text-gray-600"
          } mt-[6px]`}
        >
          {error || helperText}
        </p>
      )}
      {/* Add CSS directly for Webkit-specific behavior */}
      <style jsx>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
      `}</style>
    </div>
  );
}

export default SInput;
