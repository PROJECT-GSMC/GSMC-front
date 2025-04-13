"use client"
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import { useForm, Controller } from "react-hook-form"
import { AuthForm } from "../../src/widgets/auth/ui"

interface LoginFormProps {
  email: string;
  password: string;
}

const LoginPage = () => {
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
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="LOG IN">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-[25rem] gap-[3.625rem]"
        >
          <div className="flex flex-col gap-[0.75rem] self-stretch">
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
              render={({ field }) => <Input label="이메일" type="email" error={errors.email?.message} {...field} />}
            />
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
              render={({ field }) => <Input label="비밀번호" type="password" error={errors.password?.message} {...field} />}
            />
          </div>
          <Button label="로그인" variant="blue" isActive={isValid} />
        </form>
      </AuthForm>
    </div>
  )
}

export default LoginPage;