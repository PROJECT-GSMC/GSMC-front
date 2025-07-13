import type { FieldError } from "react-hook-form";

interface InputContainerProps {
  label: string;
  htmlFor: string;
  children?: React.ReactNode;
  error: FieldError | undefined;
}

const InputContainer = ({ label, htmlFor, children, error }: InputContainerProps) => {
  return (
    <section className="flex flex-col items-start w-full gap-1">
      <label htmlFor={htmlFor} className="text-label">{label}</label>
      {children}
      <small className={`w-full text-start text-errors-500 text-sm mt-1 min-h-[1.25rem] ${error ? "visible" : "invisible"}`}>
        {error?.message ?? "\u00A0"}
      </small>
    </section>
  )
}

export { InputContainer }