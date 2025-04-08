"use client";
import { useMemo } from "react";
import { variantStyles } from "./consts/button";

type ButtonState = "default" | "active" | "disabled";

interface ButtonProps {
  label: string;
  variant: keyof typeof variantStyles;
  width?: string;
  isActive?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const Button = ({ variant, isActive, label, width, hover, onClick }: ButtonProps) => {
  const state: ButtonState = isActive ? "default" : onClick ? "active" : "disabled"
  const baseStyle = "flex py-[0.8125rem] w-full text-body2 px-[1.375rem] justify-center items-center self-stretch rounded-[0.75rem] transition-colors";
  const buttonStyle = useMemo(() => variantStyles[variant][state], [variant, state]);

  return (
    <button
      className={`${baseStyle} ${buttonStyle} ${width}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};