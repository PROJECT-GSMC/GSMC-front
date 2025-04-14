import React from "react";

interface AuthInputProps {
  label: string
  error?: string
  children: React.ReactNode
}

export const AuthInput = ({ label, error, children }: AuthInputProps) => {
  return (
    <div className="flex flex-col w-full gap-[0.56rem]">
      <label htmlFor={label} className="text-label">{label}</label>
      {children}
      {error && <small role="alert" className="text-red-500">{error}</small>}
    </div>
  );
};
