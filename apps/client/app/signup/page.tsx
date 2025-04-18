"use client"
import { Button } from "@repo/ui/button"
import { useForm } from "react-hook-form"
import { AuthForm } from "../../src/widgets/auth/ui"
import { SignupFormProps } from "../../src/shared/model/AuthForm"
import { useState } from "react"
import StepAuthCode from "../../src/widgets/stepAuthCode/ui"
import StepPassword from "../../src/widgets/stepPassword/ui"

const SignupPage = () => {
  const [step, setStep] = useState("authCode")

  const {
    control,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = useForm<SignupFormProps>({ mode: "onChange", defaultValues: { name: '', email: '', authcode: '', password: '', passwordCheck: '' } })

  const watchedValues = watch();

  const isAuthCodeStepValid = Boolean(
    watchedValues.name &&
    watchedValues.email &&
    /^s\d{5}@gsm\.hs\.kr$/.test(watchedValues.email) &&
    !errors.name &&
    !errors.email
  );

  const canProceedToPassword = isAuthCodeStepValid && Boolean(
    watchedValues.authcode &&
    !errors.authcode
  );

  const isPasswordValid = Boolean(
    watchedValues.password &&
    watchedValues.passwordCheck &&
    watchedValues.password === watchedValues.passwordCheck &&
    !errors.password &&
    !errors.passwordCheck
  );

  const onSubmit = (data: SignupFormProps) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="SIGN UP">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-[25rem] gap-[3.625rem]"
        >
          {step === "authCode" ? (
            <>
              <div className="flex flex-col gap-[0.75rem] self-stretch">
                <StepAuthCode
                  control={control}
                  isAuthButtonActive={isAuthCodeStepValid}
                />
              </div>
              <Button
                label="인증하기"
                variant="blue"
                className={canProceedToPassword ? "default" : "disabled"}
                onClick={() => canProceedToPassword && setStep("password")}
              />
            </>
          ) : (
            <>
              <div className="flex flex-col gap-[0.75rem] self-stretch">
                <StepPassword control={control} />
              </div>
              <Button
                label="회원가입"
                variant="blue"
                state={isPasswordValid ? "default" : "disabled"}
              />
            </>
          )}
        </form>
      </AuthForm>
    </div>
  )
}

export default SignupPage;