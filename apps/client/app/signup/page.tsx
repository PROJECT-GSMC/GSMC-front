"use client";
import { Button } from "@repo/ui/button";
import { useForm } from "react-hook-form";
import { AuthForm } from "../../src/widgets/auth/ui";
import { SignupFormProps } from "../../src/shared/model/AuthForm";
import { useState } from "react";
import StepAuthCode from "../../src/widgets/stepAuthCode/ui";
import StepPassword from "../../src/widgets/stepPassword/ui";
import { usePostSignup } from "../../src/entities/signup/model/usePostSignup";
import { patchVerifyEmail } from "../../src/entities/signup/api/patchVerifyEmail";

import { toast } from "sonner";

const SignupPage = () => {
  const [step, setStep] = useState("authCode");
  const [isAuthVerifying, setIsAuthVerifying] = useState(false);
  const { mutate: signupMutate, isPending } = usePostSignup();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormProps>({
    mode: "onChange",
    defaultValues: { name: "", email: "", authcode: "", password: "", passwordCheck: "" },
  });

  const watchedValues = watch();

  const isAuthCodeStepValid = Boolean(
    watchedValues.name &&
      watchedValues.email &&
      /^s\d{5}@gsm\.hs\.kr$/.test(watchedValues.email) &&
      !errors.name &&
      !errors.email
  );

  const canProceedToPassword = isAuthCodeStepValid && Boolean(watchedValues.authcode && !errors.authcode);

  const isPasswordValid = Boolean(
    watchedValues.password &&
      watchedValues.passwordCheck &&
      watchedValues.password === watchedValues.passwordCheck &&
      !errors.password &&
      !errors.passwordCheck
  );

  const onSubmit = async (data: SignupFormProps) => {
    signupMutate(data);
  };

  const handleVerifyEmail = async () => {
    if (!canProceedToPassword || isAuthVerifying) return;

    try {
      setIsAuthVerifying(true);
      const response = await patchVerifyEmail(Number(watchedValues.authcode));

      if (response.status === 204) {
        setStep("password");
      } else if (response.status === 401) {
        toast.error("인증코드가 일치하지 않습니다.");
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsAuthVerifying(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="SIGN UP">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-[25rem] gap-[3.625rem]">
          {step === "authCode" ? (
            <>
              <div className="flex flex-col gap-[0.75rem] self-stretch">
                <StepAuthCode control={control} isAuthButtonActive={isAuthCodeStepValid} />
              </div>
              <Button
                label="인증하기"
                variant="blue"
                isActive={canProceedToPassword && !isAuthVerifying}
                onClick={handleVerifyEmail}
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
                isActive={isPasswordValid && !isPending}
                onClick={() => (isPasswordValid && !isPending ? handleSubmit(onSubmit)() : undefined)}
              />
            </>
          )}
        </form>
      </AuthForm>
    </div>
  );
};

export default SignupPage;
