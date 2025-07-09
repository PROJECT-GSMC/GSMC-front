import type { HTMLInputTypeAttribute } from "react"
import { useController, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
}

const Input = <T extends FieldValues>({ name, control, rules, type = "text", className, placeholder }: InputProps<T>) => {
  const { field: { onChange, onBlur, value, ref }, fieldState: { error } } = useController({ name, control, rules })

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full h-full">
        <input
          ref={ref}
          className={`
            w-full h-[2.875rem] px-4 py-3 rounded-md border 
            bg-white ${((error?.message) == null) ? "focus:outline-tropicalblue-500" : "focus:outline-errors-500"} outline-gray-500 ${className}`}
          name={name}
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}

export { Input }