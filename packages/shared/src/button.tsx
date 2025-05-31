"use client";
import { variantStyles } from "@repo/consts/index";
import { useMemo } from "react";
import type { ReactNode } from "react";

type ButtonState = "default" | "active" | "disabled";

interface ButtonProps {
  className?: string;
  label: string | ReactNode;
  variant: keyof typeof variantStyles;
  state?: ButtonState;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  value?: string;
}

const Button = ({
  className,
  label,
  variant,
  state = "default",
  type = "button",
  value,
  onClick,
}: ButtonProps) => {
  const baseStyle =
    "flex cursor-pointer py-2 sm:py-[0.8125rem] w-full text-body2 px-3 sm:px-4 md:px-5 lg:px-[1.375rem] justify-center items-center self-stretch rounded-[0.75rem] transition-colors whitespace-nowrap";
  const buttonStyle = useMemo(
    () => variantStyles[variant][state],
    [variant, state]
  );

  return (
    <button
      value={value}
      type={type}
      className={`${baseStyle} ${buttonStyle} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { Button };
