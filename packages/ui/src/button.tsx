"use client";
import { useMemo } from "react";
import { variantStyles } from "./consts/button";

type ButtonState = "default" | "active" | "disabled";

interface ButtonProps {
  label: string;
  variant: keyof typeof variantStyles;
  width?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const Button = ({ variant, isActive, label, width, onClick }: ButtonProps) => {
  const state: ButtonState = isActive ? "default" : onClick ? "active" : "disabled";
  const baseStyle =
    "flex py-2 sm:py-[0.8125rem] w-full text-body2 px-3 sm:px-4 md:px-5 lg:px-[1.375rem] justify-center items-center self-stretch rounded-[0.75rem] transition-colors whitespace-nowrap";
  const buttonStyle = useMemo(() => variantStyles[variant][state], [variant, state]);

  return (
    <button type="submit" className={`${baseStyle} ${buttonStyle} ${width}`} onClick={onClick}>
      {label}
    </button>
  );
};
