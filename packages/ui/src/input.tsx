"use client"
import React from "react";
import { useController, UseControllerProps, FieldValues } from "react-hook-form";

interface InputProps<T extends FieldValues = FieldValues> extends UseControllerProps<T> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const Input = <T extends FieldValues = FieldValues>({ type, ...props }: InputProps<T>) => {
  const { field } = useController(props);

  // name이 password이면 password 타입으로, 아니면 주어진 type이나 기본값 text 사용
  const inputType = field.name === "password" ? "password" : type || "text";

  return (
    <input
      className="px-[1rem] py-[0.75rem] rounded-[0.75rem] border focus: outline-tropicalblue-500 bg-white ui-outline-gray-600"
      type={inputType}
      {...field}
    />
  );
}