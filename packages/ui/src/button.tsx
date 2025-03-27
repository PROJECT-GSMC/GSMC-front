"use client"
import { useMemo } from "react";

interface ButtonProps {
  label: string;
  isActive?: boolean;
  type: "primary" | "secondary";
  onClick?: () => void;
}

export const Button = ({ label, isActive = false, type, onClick }: ButtonProps) => {
  const buttonStyle = useMemo(() => {
    const primary = isActive ? "bg-main-500 text-white" : "border-gray-200 text-gray-500";
    const secondary = isActive ? "border-tropicalblue-400 text-tropicalblue-400" : "border-gray-300 text-gray-800";

    return `${type == "primary" ? primary : secondary}`;
  }, [isActive, type]);

  return (
    <button className={`flex py-[0.8125rem] px-[1.375rem] border justify-center items-center self-stretch rounded-[0.75rem] ${buttonStyle}`} disabled={!isActive}>
      {label}
    </button>
  )
}


