import React from "react";

interface InputContainerProps {
  label: string
  children: React.ReactNode
}

export const InputContainer = ({ label, children }: InputContainerProps) => {
  return (
    <div className="flex flex-col w-full gap-[0.56rem]">
      <label className="text-label">{label}</label>
      {children}
    </div>
  );
};
