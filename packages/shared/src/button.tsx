"use client";
import { variantStyles } from "@repo/consts/button";
import { useMemo } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonState = "default" | "active" | "disabled";

interface ButtonProps {
  className?: string;
  label: string | ReactNode;
  variant: keyof typeof variantStyles;
  state?: ButtonState;
}

const Button = ({
  className,
  label,
  variant,
  state = "default",
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyle =
    "flex cursor-pointer py-2 sm:py-[0.8125rem] w-full text-body2 px-3 sm:px-4 md:px-5 lg:px-[1.375rem] justify-center items-center self-stretch rounded-[0.75rem] transition-colors whitespace-nowrap";
  const buttonStyle = useMemo(
    () => variantStyles[variant][state],
    [variant, state],
  );

  return (
    <button className={`${baseStyle} ${buttonStyle} ${className}`} {...props}>
      {label}
    </button>
  );
};

export { Button };
