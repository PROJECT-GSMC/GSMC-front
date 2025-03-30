import { useState, useEffect, useRef } from "react";

interface DropdownProps<T> {
  options: T[];
  value: T;
  label?: string;
  onChange: (value: T) => void;
}

const Dropdown = <T,>({
  options,
  label,
  value,
  onChange,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    )
      setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("click", handleClickOutside);
    else document.removeEventListener("click", handleClickOutside);
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
        className={`rounded-[0.625rem] text-left ${isOpen && "border-main-500"} px-[1.5rem] py-[1rem] border mt-[0.5rem]`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {value ? String(value) : "선택해주세요"}
      </button>

      {isOpen && (
        <ul className="absolute z-10 rounded-[0.625rem] bg-white w-full border overflow-auto max-h-[200px] top-[6rem]">
          {options.map((option, index) => (
            <li
              className="rounded-[0.625rem] text-left px-[1.5rem] py-[1rem]  hover:bg-gray-100 cursor-pointer"
              key={index}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {String(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
