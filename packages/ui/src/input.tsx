interface InputProps {
  label: string;
}

export const Input = ({ label }: InputProps) => {
  return (
    <div className="flex flex-col gap-[0.25rem] items-start">
      <label htmlFor="email" className="text-black text-center text-[1rem] font-normal">{label}</label>
      <input type="text" name="email" className="flex w-[25rem] p-[1rem] items-center gap-[0.625rem] rounded-[0.5rem] border bg-white outline-main-500" />
    </div>
  )
}