"use client"
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import { useForm, Controller } from "react-hook-form"
import { AuthForm } from "../../src/widgets/auth/ui"

interface SignupFormProps {
  email: string;
  authcode: string;
}

const SignupPage = () => {
  const {
    control,
    handleSubmit,
    formState: {
      isValid,
      errors
    }
  } = useForm<SignupFormProps>({ mode: "onChange", defaultValues: { email: '', authcode: '' } })

  const onSubmit = (data: SignupFormProps) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="SIGN UP">
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
              name="authcode"
              control={control}
              rules={{
                minLength: 8,
                maxLength: 8,
                required: "인증번호를 필수로 입력해야 합니다.",
              }}
              render={({ field }) => <Input label="인증번호" error={errors.authcode?.message} {...field} />}
            />
          </div>
          <Button label="인증하기" variant="blue" isActive={isValid} />
        </form>
      </AuthForm>
    </div>
  )
}

export default SignupPage;