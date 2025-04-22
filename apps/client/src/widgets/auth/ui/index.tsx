import { ReactElement } from "react"

interface AuthForm {
  children: ReactElement,
  label: string
}

export const AuthForm = ({ children, label }: AuthForm) => {
  return (
    <div className="flex flex-col pt-[5.625rem] p-[6.25rem] justify-center items-center rounded-[1.25rem] bg-white ">
      <h1 className="text-[2.25rem] font-bold">{label}</h1>
      {children}
    </div>
  )
}