"use client";

import { useRef } from "react";
import { useController } from "react-hook-form";
import type { UseControllerProps, FieldValues } from "react-hook-form";

interface InputProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  min?: number;
  max?: number;
}

const Input = <T extends FieldValues = FieldValues>({
  type,
  className,
  min,
  max,
  ...props
}: InputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ ...props, rules: props.rules });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        className={`px-[1rem] py-[0.75rem] rounded-[0.75rem] border focus:outline-tropicalblue-500 bg-white ui-outline-gray-600 w-full ${className}`}
        type={type ?? "text"}
        value={field.value ?? ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
        name={field.name}
        min={min}
        max={max}
      />
      <small className={`text-red-500 text-sm mt-1 min-h-[1.25rem] ${error ? "visible" : "invisible"}`}>{error?.message ?? "\u00A0"}</small>
    </div>
  );
};

export { Input };
