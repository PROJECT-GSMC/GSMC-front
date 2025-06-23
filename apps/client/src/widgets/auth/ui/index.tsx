import type { ReactElement } from "react"

interface AuthForm {
  children: ReactElement,
  label: string
}

const smLayout = "w-[25rem] p-[2.25rem] pt-[2.62rem]"
const mdLayout = "md:w-[30rem] md:p-[4.25rem] md:pt-[4.62rem]"
const lgLayout = "lg:w-[35rem] lg:p-[6.25rem] lg:pt-[5.62rem]"


export const AuthForm = ({ children, label }: AuthForm) => {
  return (
    <div className={`flex flex-col justify-center items-center rounded-[1.25rem] bg-white ${smLayout} ${mdLayout} ${lgLayout}`}>
      <h1 className="text-[2.25rem] font-bold">{label}</h1>
      {children}
    </div>
  )
}