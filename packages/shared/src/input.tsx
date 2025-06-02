"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  useController,
  UseControllerProps,
  FieldValues,
} from "react-hook-form";

interface InputProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  isEmail?: boolean;
}

export const Input = <T extends FieldValues = FieldValues>({
  type,
  className,
  isEmail = false,
  ...props
}: InputProps<T>) => {
  const { field } = useController(props);
  const [displayValue, setDisplayValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const suffix = "@gsm.hs.kr";

  const isValidEmailPrefix = (value: string): boolean => {
    if (value.length > 6) return false;
    if (value.length > 0 && !/^[0-9s]/.test(value)) return false;
    if (value.length > 1 && !/^[0-9s][0-9]*$/.test(value)) return false;
    return true;
  };

  useEffect(() => {
    if (isEmail && typeof field.value === "string") {
      const valueWithoutSuffix = field.value.endsWith(suffix)
        ? field.value.slice(0, -suffix.length)
        : field.value;
      setDisplayValue(valueWithoutSuffix);
    } else {
      setDisplayValue(field.value || "");
    }
  }, [field.value, isEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (isEmail) {
      if (newValue.endsWith(suffix)) {
        const prefix = newValue.slice(0, newValue.length - suffix.length);
        if (isValidEmailPrefix(prefix)) {
          setDisplayValue(prefix);
          field.onChange(prefix + suffix);
        }
      } else {
        const cursorPosition = e.target.selectionStart || 0;
        const currentValueLength = displayValue.length;

        if (cursorPosition <= currentValueLength) {
          const newPrefix =
            newValue.length > currentValueLength + suffix.length
              ? newValue.slice(0, -suffix.length)
              : newValue;

          if (isValidEmailPrefix(newPrefix)) {
            setDisplayValue(newPrefix);
            field.onChange(newPrefix + suffix);
          }
        } else {
          e.target.value = displayValue + suffix;
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

      if (input.selectionEnd && input.selectionEnd > prefixLength) {
        input.setSelectionRange(input.selectionStart || 0, prefixLength);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isEmail && inputRef.current) {
      const input = e.target as HTMLInputElement;
      const prefixLength = displayValue.length;

      if (input.selectionStart && input.selectionStart > prefixLength) {
        input.setSelectionRange(prefixLength, prefixLength);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEmail && inputRef.current) {
      const input = e.target as HTMLInputElement;
      const prefixLength = displayValue.length;
      const cursorPosition = input.selectionStart || 0;

      if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const fullLength = (displayValue + suffix).length;
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

      if (isEmail) {
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

        if (
          displayValue.length >= 6 &&
          !e.ctrlKey &&
          !e.metaKey &&
          !(input.selectionEnd && input.selectionStart !== input.selectionEnd)
        ) {
          e.preventDefault();
        }
      }
    }
  };

  return (
    <input
      ref={inputRef}
      className={`px-[1rem] py-[0.75rem] rounded-[0.75rem] border focus: outline-tropicalblue-500 bg-white ui-outline-gray-600 w-full ${className}`}
      type={field.name === "password" ? "password" : type || "text"}
      value={isEmail ? `${displayValue}${suffix}` : displayValue}
      onChange={handleChange}
      onSelect={handleSelect}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onBlur={field.onBlur}
      name={field.name}
    />
  );
};
