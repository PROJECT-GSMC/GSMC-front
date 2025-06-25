"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface Option {
  name: string;
  score?: string;
  max_number?: string;
  send: string | number;
  id?: number;
}

interface DropdownProps {
  options: Option[];
  value?: Option;
  label?: string;
  onChange: (value: Option) => void;
}

const Dropdown = ({ options, label, value, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleButtonClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option: Option) => () => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange],
  );

  return (
    <div
      className="w-full flex flex-col gap-0.5 relative text-[0.925rem] sm:text-[1rem]"
      ref={dropdownRef}
    >
      {typeof label === "string" && label.trim() !== "" && (
        <label className="text-gray-900 text-label" htmlFor={label}>
          {label}
        </label>
      )}

      <button
        className={`rounded-[0.625rem] min-h-[56px] text-left ${
          isOpen ? "border-tropicalblue-500" : ""
        } px-[1.5rem] py-[1rem] border mt-[0.5rem]`}
        type="button"
        onClick={handleButtonClick}
      >
        <div className="flex gap-2">
          <span>{value?.name ?? "선택해주세요"}</span>
          {value?.score != null && value.score !== "" && (
            <span>/ {value.score}</span>
          )}
          {value?.max_number != null && value.max_number !== "" && (
            <span>/ {value.max_number}</span>
          )}
        </div>
      </button>

      {isOpen ? (
        <ul className="absolute z-10 rounded-[0.625rem] bg-white w-full border overflow-auto max-h-[200px] top-[6rem]">
          {options.map((option, index) => (
            <li
              className="rounded-[0.625rem] text-left px-[1.5rem] py-[1rem] hover:bg-gray-100 cursor-pointer"
              key={index}
              onClick={handleSelect(option)}
            >
              <div className="flex gap-1 sm:gap-2">
                <span>{option.name}</span>
                {option.score == null ? null : <span>/ {option.score}</span>}
                {option.max_number == null ? null : (
                  <span>/ {option.max_number}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
