import React from "react";

interface InputContainerProps {
  label: string
  error?: string
  children: React.ReactNode
}

export const InputContainer = ({ label, error, children }: InputContainerProps) => {
  return (
    <div className="flex flex-col w-full gap-[0.56rem]">
      <label htmlFor={label} className="text-label">{label}</label>
      {children}
      {error && <small role="alert" className="text-red-500">{error}</small>}
    </div>
  );
};
