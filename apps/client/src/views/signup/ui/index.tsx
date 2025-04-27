"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@repo/ui/button";

import { AuthForm } from "@widgets/auth/ui";
import StepPassword from "@widgets/stepPassword/ui";
import StepAuthCode from "@widgets/stepAuthCode/ui";
import { usePostSignup } from "@entities/signup/model/usePostSignup";
import { patchVerifyEmail } from "@entities/signup/api/patchVerifyEmail";
import { SignupFormProps } from "@shared/model/AuthForm";


const SignupView = () => {
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

  const canProceedToPassword =
    isAuthCodeStepValid && Boolean(watchedValues.authcode && watchedValues.authcode.length >= 8 && !errors.authcode);

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
      }
    } catch {
      toast.error("인증코드가 일치하지 않습니다.");
    } finally {
      setIsAuthVerifying(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="SIGN UP">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center gap-[3.625rem]">
          {step === "authCode" ? (
            <>
              <div className="flex flex-col gap-[0.75rem] self-stretch">
                <StepAuthCode control={control} isAuthButtonActive={isAuthCodeStepValid} />
              </div>
              <Button
                label="인증하기"
                variant="blue"
                state={canProceedToPassword && !isAuthVerifying ? "default" : "disabled"}
                onClick={() => (canProceedToPassword && !isAuthVerifying ? handleVerifyEmail() : undefined)}
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
                state={isPasswordValid && !isPending ? "default" : "disabled"}
                onClick={() => (isPasswordValid && !isPending ? handleSubmit(onSubmit)() : undefined)}
              />
            </>
          )}
        </form>
      </AuthForm>
    </div>
  );
};

export default SignupView;
