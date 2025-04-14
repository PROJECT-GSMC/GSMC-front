"use client"
import { Input } from "@repo/ui/input"
import { Button } from "@repo/ui/button"
import { useForm } from "react-hook-form"
import { AuthForm } from "../../src/widgets/auth/ui"
import { AuthInput } from "@repo/ui/widgets/authInput/index"
import { SignupFormProps } from "../../src/shared/model/AuthForm"

const SignupPage = () => {
  const {
    control,
    handleSubmit,
    formState: {
      isValid,
      errors
    }
  } = useForm<SignupFormProps>({ mode: "onChange", defaultValues: { name: '', email: '', authcode: '' } })

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
            <AuthInput label="이름" error={errors.name?.message}>
              <Input name="name" control={control} rules={{
                required: "이름을 필수로 입력해야 합니다."
              }} />
            </AuthInput>
            <AuthInput label="이메일" error={errors.email?.message}>
              <div className="flex items-center justify-between gap-4">
                <Input name="email" control={control} rules={{
                  required: "이메일을 필수로 입력해야 합니다.",
                  pattern: {
                    value: /^s\d{5}@gsm\.hs\.kr$/,
                    message: "@gsm.hs.kr 학교 이메일을 입력해주세요"
                  }
                }} />
                <Button label="인증번호" variant="blue" />
              </div>
            </AuthInput>
            <AuthInput label="인증번호" error={errors.authcode?.message}>
              <Input name="authcode" control={control} rules={{
                required: "인증번호를 필수로 입력해야 합니다.",
                minLength: 8,
                maxLength: 8,
              }} />
            </AuthInput>
          </div>
          <Button label="인증하기" variant="blue" isActive={isValid} />
        </form>
      </AuthForm>
    </div>
  )
}

export default SignupPage;