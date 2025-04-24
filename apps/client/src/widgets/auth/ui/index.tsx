import { ReactElement } from "react"

interface AuthForm {
  children: ReactElement,
  label: string
}

export const AuthForm = ({ children, label }: AuthForm) => {
  return (
    <div className="flex flex-col p-[2.25rem] pt-[2.62rem] md:p-[4.25rem] md:pt-[4.62rem] lg:p-[6.25rem] lg:pt-[5.62rem] justify-center items-center rounded-[1.25rem] bg-white ">
      <h1 className="text-[2.25rem] font-bold">{label}</h1>
      {children}
    </div>
  )
}