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

export const Button = ({
  variant,
  isActive,
  label,
  width,
  onClick,
}: ButtonProps) => {
  const state: ButtonState = isActive
    ? "default"
    : onClick
      ? "active"
      : "disabled";

  const buttonStyle = useMemo(
    () => variantStyles[variant][state],
    [variant, state]
  );

  return (
    <button
      type="submit"
      className={`${buttonStyle} ${width || "w-full"} flex justify-center items-center self-stretch px-[1rem] py-[0.75rem] text-body2 rounded-[0.75rem] transition-colors `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
