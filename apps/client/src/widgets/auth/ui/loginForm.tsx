"use client"
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import { useForm, Controller } from "react-hook-form"

interface LoginFormProps {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {
      isValid,
      errors
    }
  } = useForm<LoginFormProps>({ mode: "onChange", defaultValues: { email: '', password: '' } })

  const onSubmit = (data: LoginFormProps) => {
    alert(JSON.stringify(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex pt-[5.625rem] p-[6.25rem] justify-center items-center rounded-[1.25rem] bg-white ">
      <div className="flex flex-col items-center gap-[3.625rem]">
        <h1 className="text-[2.25rem] font-bold">LOG IN</h1>
        <div className="flex flex-col gap-[0.75rem] items-start self-stretch">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "이메일을 필수로 입력해야 합니다.",
              pattern: {
                value: /^s\d{5}@gsm\.hs\.kr$/,
                message: "@gsm.hs.kr 학교 이메일을 입력해주세요"
              }
            }}
            render={({ field }) => <Input label="이메일" type="email" {...field} />}
          />
          {<small role="alert" className="text-red-500">{errors.email?.message}</small>}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "비밀번호을 필수로 입력해야 합니다.",
              minLength: {
                value: 8,
                message: "영문, 숫자를 포함한 8자 이상으로 입력해주세요."
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
                message: "영문, 숫자를 포함한 비밀번호를 입력해주세요."
              }
            }}
            render={({ field }) => <Input label="비밀번호" type="password" {...field} />}
          />
          {<small role="alert" className="text-red-500">{errors.password?.message}</small>}
        </div>
        <Button label="로그인" type="primary" isActive={isValid} />
      </div>
    </form>
  )
}
