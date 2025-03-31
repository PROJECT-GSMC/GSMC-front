import React from "react";

interface InputProps {
  label: string;
  value: string;
  type?: "text" | "password" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (
  ({ label, type = "text", value, onChange }: InputProps) => {
    return (
      <div className="flex flex-col w-full gap-[0.25rem] items-start">
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
      </div>
    );
  }
);
