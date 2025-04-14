"use client"
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface InputProps extends UseControllerProps<any> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ ...props }: InputProps) => {
  const { field } = useController(props);

  return (
    <input
      className="px-[1rem] py-[0.75rem] rounded-[0.75rem] border focus: outline-tropicalblue-500 bg-white ui-outline-gray-600"
      type={field.name}
      {...field}
    />
  );
}