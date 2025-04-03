import React from "react";

interface InputProps {
  label: string;
  value: string;
  type?: "text" | "password" | "email";
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (
  ({ label, type = "text", value, error, onChange }: InputProps) => {
    return (
      <div className="flex flex-col w-full">
        <label htmlFor={label} className="text-label">
          {label}
        </label>
        <input
          id={label}
          name={label}
          type={type}
          value={value}
          onChange={onChange}
          className="p-[1rem] rounded-[0.5rem] border bg-white ui-outline-gray-600"
        />
        <small role="alert" className="text-red-500">{error}</small>
      </div>
    );
  }
);
