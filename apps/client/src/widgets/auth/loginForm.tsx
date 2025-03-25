"use client"
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import { useForm, Controller } from "react-hook-form"

export const LoginForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))} className="flex pt-[5.625rem] p-[6.25rem] justify-center items-center rounded-[1.25rem] bg-white ">
      <div className="flex flex-col items-center gap-[3.625rem]">
        <h1 className="text-[2.25rem] font-bold">LOG IN</h1>
        <div className="flex flex-col gap-[0.75rem] items-start self-stretch">
          <Controller
            name="email"
            control={control}
            rules={{ required: "이메일은 필수입니다." }}
            render={({ field }) => <Input label="이메일" type="email" {...field} />}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "비밀번호는 필수입니다." }}
            render={({ field }) => <Input label="비밀번호" type="password" {...field} />}
          />
        </div>
        <div className="flex">
          <Button label="로그인" type="primary" isActive={true} />
          <Button label="로그인" type="primary" />
        </div>
        <div className="flex">
          <Button label="로그인" type="secondary" isActive={true} />
          <Button label="로그인" type="secondary" />
        </div>
      </div>
    </form>
  )
}
