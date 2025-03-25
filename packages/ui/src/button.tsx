"use client"
import { useEffect, useState } from "react";

interface ButtonProps {
  label: string;
  isActive?: boolean;
  type?: "primary" | "secondary";
}

export const Button = ({ label, isActive, type }: ButtonProps) => {

  const [style, setStyle] = useState("")

  useEffect(() => {
    if (type === "primary") {
      if (isActive) {
        setStyle("bg-main-500 text-white")
      } else {
        setStyle("bg-gray-200 text-gray-500")
      }
    } else if (type === "secondary") {
      if (isActive) {
        setStyle("border-tropicalblue-400 text-tropicalblue-400")
      } else {
        setStyle("border-gray-300 text-gray-800")
      }
    }
  }, [])

  return (
    <button className={`flex py-[0.8125rem] px-[1.375rem] border justify-center items-center self-stretch rounded-[0.75rem] ${style}`}>
      {label}
    </button>
  )
}