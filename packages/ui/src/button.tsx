"use client";
import { useMemo } from "react";

type Enable = "default"
type Disable = "disabled" | "active"
interface CustomButton {
  default: string,
  active: string,
  disabled: string
}

interface ButtonProps {
  label: string;
  variant: CustomButton;
  width?: string
  isActive?: boolean;
  onClick?: () => void;
  width?: string;
}

export const Button = ({ variant, isActive, label, width, onClick }: ButtonProps) => {
  const state: Enable | Disable = isActive ? "default" : onClick ? "active" : "disabled"
  const baseStyle = "flex py-[0.8125rem] w-full text-body2 px-[1.375rem] justify-center items-center self-stretch rounded-[0.75rem] transition-colors";
  const buttonStyle = useMemo(() => {
    return variant[state]
  }, [variant, state]);

  return (
    <button
      className={`${baseStyle} ${buttonStyle} ${width}`}
      disabled={state === "disabled"}
      onClick={onClick}
    >
      {label}
    </button>
  );
};