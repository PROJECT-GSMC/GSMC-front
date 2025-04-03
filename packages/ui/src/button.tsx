"use client";
import { useMemo } from "react";

type Enable = "default"
type Disable = "disabled" | "active"
type DefaultButton = "primary" | "secondary"

interface CustomButton {
  default: string,
  active: string,
  disabled: string
}

interface ButtonProps {
  label: string;
  variant: DefaultButton | CustomButton;
  isActive?: boolean;
  onClick?: () => void;
}

export const Button = ({ variant, isActive, label, onClick }: ButtonProps) => {
  const state: Enable | Disable = isActive ? "default" : onClick ? "active" : "disabled"

  const baseStyle = "flex py-[0.8125rem] w-full text-body2 px-[1.375rem] justify-center items-center self-stretch rounded-[0.75rem] transition-colors";

  const buttonStyle = useMemo(() => {
    if (typeof variant == "string") {
      const variantStyles = {
        primary: {
          default: "bg-tropicalblue-500 text-white",
          active: "bg-tropicalblue-900 text-white",
          disabled: "bg-gray-200 text-gray-500 cursor-not-allowed"
        },
        secondary: {
          default: "bg-white border border-tropicalblue-400 text-tropicalblue-400 hover:bg-tropicalblue-500 hover:text-white hover:border-tropicalblue-500",
          active: "bg-gray-300 border border-tropicalblue-400 text-tropicalblue-400 hover:bg-tropicalblue-500 hover:text-white hover:border-tropicalblue-500",
          disabled: "bg-white border border-gray-500 text-gray-500 cursor-not-allowed"
        }
      };
      if (variant === "primary" || variant === "secondary") {
        return variantStyles[variant][state];
      }
    }
    return variant[state]
  }, [variant, state]);

  return (
    <button
      className={`${baseStyle} ${buttonStyle}`}
      disabled={state === "disabled"}
      onClick={onClick}
    >
      {label}
    </button>
  );
};