"use client";
import { useState, useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import type { UseControllerProps, FieldValues } from "react-hook-form";

interface InputProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  isEmail?: boolean;
  min?: number;
  max?: number;
}

const SUFFIX = "@gsm.hs.kr";

const isValidEmailPrefix = (value: string): boolean => {
  if (value.length > 6) return false;
  if (value.length > 0 && !/^[0-9s]/.test(value)) return false;
  if (value.length > 1 && !/^[0-9s][0-9]*$/.test(value)) return false;
  return true;
};

const Input = <T extends FieldValues = FieldValues>({
  type,
  className,
  isEmail = false,
  min,
  max,
  ...props
}: InputProps<T>) => {
  const { field } = useController(props);
  const [displayValue, setDisplayValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEmail && typeof field.value === "string") {
      const value = field.value as string;
      const valueWithoutSuffix = value.endsWith(SUFFIX)
        ? value.slice(0, -SUFFIX.length)
        : value;
      setDisplayValue(valueWithoutSuffix);
    } else {
      const value = typeof field.value === "string" ? field.value : "";
      setDisplayValue(value);
    }
  }, [field.value, isEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (isEmail) {
      if (newValue.endsWith(SUFFIX)) {
        const prefix = newValue.slice(0, newValue.length - SUFFIX.length);
        if (isValidEmailPrefix(prefix)) {
          setDisplayValue(prefix);
          field.onChange(prefix + SUFFIX);
        }
      } else {
        const cursorPosition = e.target.selectionStart ?? 0;
        const currentValueLength = displayValue.length;

        if (cursorPosition <= currentValueLength) {
          const newPrefix =
            newValue.length > currentValueLength + SUFFIX.length
              ? newValue.slice(0, -SUFFIX.length)
              : newValue;

          if (isValidEmailPrefix(newPrefix)) {
            setDisplayValue(newPrefix);
            field.onChange(newPrefix + SUFFIX);
          }
        } else {
          e.target.value = displayValue + SUFFIX;
        }
      }
    } else {
      setDisplayValue(newValue);
      field.onChange(newValue);
    }
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (isEmail && inputRef.current) {
      const input = e.target as HTMLInputElement;
      const prefixLength = displayValue.length;
      const selectionEnd = input.selectionEnd ?? 0;

      if (selectionEnd > prefixLength) {
        const selectionStart = input.selectionStart ?? 0;
        input.setSelectionRange(selectionStart, prefixLength);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isEmail && inputRef.current) {
      const input = e.target as HTMLInputElement;
      const prefixLength = displayValue.length;
      const selectionStart = input.selectionStart ?? 0;

      if (selectionStart > prefixLength) {
        input.setSelectionRange(prefixLength, prefixLength);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEmail && inputRef.current) {
      const input = e.target as HTMLInputElement;
      const prefixLength = displayValue.length;
      const cursorPosition = input.selectionStart ?? 0;

      if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const fullLength = (displayValue + SUFFIX).length;
        input.setSelectionRange(0, fullLength);
        return;
      }

      if (cursorPosition > prefixLength) {
        const allowedKeys = [
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "Home",
          "End",
          "Tab",
        ];
        if (!allowedKeys.includes(e.key)) {
          e.preventDefault();
        }
        return;
      }

      const alwaysAllowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
        "Tab",
      ];
      if (alwaysAllowedKeys.includes(e.key)) {
        return;
      }

      if (cursorPosition === 0) {
        if (!/^[0-9s]$/.test(e.key)) {
          e.preventDefault();
        }
      } else {
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
        }
      }

      const selectionStart = input.selectionStart ?? 0;
      const selectionEnd = input.selectionEnd ?? 0;
      const hasSelection = selectionStart !== selectionEnd;

      if (
        displayValue.length >= 6 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !hasSelection
      ) {
        e.preventDefault();
      }
    }
  };

  return (
    <input
      ref={inputRef}
      className={`px-[1rem] py-[0.75rem] rounded-[0.75rem] border focus: outline-tropicalblue-500 bg-white ui-outline-gray-600 w-full ${className}`}
      type={field.name === "password" ? "password" : (type ?? "text")}
      value={isEmail ? `${displayValue}${SUFFIX}` : displayValue}
      onChange={handleChange}
      onSelect={handleSelect}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onBlur={field.onBlur}
      name={field.name}
      min={min}
      max={max}
    />
  );
};

export { Input };
