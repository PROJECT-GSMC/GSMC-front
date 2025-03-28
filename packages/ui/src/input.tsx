import React from 'react';

interface InputProps {
  label: string;
  type?: "text" | "password" | "email";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  ref: React.Ref<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", name, value, onChange, onBlur }, ref) => {
    return (
      <div className="flex flex-col gap-[0.25rem] items-start">
        <label htmlFor={name} className="text-black text-center text-[1rem] font-normal">{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          className="flex w-[25rem] p-[1rem] items-center gap-[0.625rem] rounded-[0.5rem] border bg-white outline-main-500"
        />
      </div>
    )
  }
);
