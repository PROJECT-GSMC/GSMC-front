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
    `w-full text-body2 rounded-[0.75rem] transition-colors whitespace-nowrap
    flex justify-center items-center self-stretch ${state == "disabled" ? "" : "cursor-pointer"}
    py-2 px-3 sm:py-[0.8125rem] sm:px-4 md:px-5 lg:px-[1.375rem]`;

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
