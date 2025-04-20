"use client";

import { useState, useEffect, useRef } from "react";

interface Option {
  name: string;
  score?: string;
  max_number?: string;
  send: string;
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

  return (
    <div className="w-full flex flex-col gap-0.5 relative" ref={dropdownRef}>
      {label && (
        <label className="text-gray-900 text-label" htmlFor={label}>
          {label}
        </label>
      )}

      <button
        className={`rounded-[0.625rem] text-left ${
          isOpen ? "border-tropicalblue-500" : ""
        } px-[1.5rem] py-[1rem] border mt-[0.5rem]`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div className="flex gap-2">
          <span>{value?.name ?? "선택해주세요"}</span>
          {value?.score && <span>/ {value?.score ?? ""}</span>}
          {value?.max_number && <span>/ {value?.max_number ?? ""}</span>}
        </div>
      </button>

      {isOpen && (
        <ul className="absolute z-10 rounded-[0.625rem] bg-white w-full border overflow-auto max-h-[200px] top-[6rem]">
          {options.map((option, index) => (
            <li
              key={index}
              className="rounded-[0.625rem] text-left px-[1.5rem] py-[1rem] hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <div className="flex gap-2">
                <span>{option.name}</span>
                {option.score && <span>/ {option.score}</span>}
                {option.max_number && <span>/ {option.max_number}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
