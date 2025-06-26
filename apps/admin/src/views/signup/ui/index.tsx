"use client";

import { Button } from "@repo/shared/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { postSignup } from "@/entities/signup/api/postSignup";
import type {
  AuthStepForm,
  SignupFormProps,
  SignupStepForm,
} from "@/shared/model/AuthForm";
import type { HttpError } from "@/shared/types/error";
import { patchVerifyEmail } from "@entities/signup/api/patchVerifyEmail";
import { AuthForm } from "@widgets/auth/ui";
import StepAuthCode from "@widgets/stepAuthCode/ui";
import StepPassword from "@widgets/stepPassword/ui";

interface SignupResponse {
  success: boolean;
  message?: string;
}

const SignupView = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [step, setStep] = useState<"authCode" | "password">("authCode");
  const [isAuthVerifying, setIsAuthVerifying] = useState(false);
  const [verifiedInfo, setVerifiedInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const {
    mutate: signupMutate,
    isPending,
    isSuccess,
  } = useMutation<SignupResponse, HttpError, SignupFormProps>({
    mutationFn: postSignup,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["auth"],
        exact: false,
      });
      if (data.success) {
        toast.success("회원가입 성공");
      }
    },
    onError: (error) => {
      if (error.httpStatus === HttpStatusCode.Unauthorized) {
        toast.error("이메일 인증을 먼저 진행해주세요.");
      } else if (error.httpStatus === HttpStatusCode.Conflict) {
        toast.error("이미 회원가입 된 계정입니다.");
      } else {
        toast.error("회원가입에 실패했습니다.");
      }
    },
  });

  const {
    control: authControl,
    handleSubmit: handleAuthSubmit,
    watch: watchAuth,
    formState: { errors: authErrors },
  } = useForm<AuthStepForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      authcode: "",
    },
  });

  const {
    control: signupControl,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupStepForm>({
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordCheck: "",
    },
  });

  const watchedAuthValues = watchAuth();

  const isAuthCodeStepValid = Boolean(
    watchedAuthValues.name &&
      watchedAuthValues.email &&
      /^s\d{5}@gsm\.hs\.kr$/.test(watchedAuthValues.email) &&
      !authErrors.name &&
      !authErrors.email,
  );

  const canProceedToPassword =
    isAuthCodeStepValid &&
    Boolean(
      watchedAuthValues.authcode &&
        watchedAuthValues.authcode.length >= 8 &&
        !authErrors.authcode,
    );

  const isPasswordValid = (data: SignupStepForm) =>
    Boolean(
      data.password &&
        data.passwordCheck &&
        data.password === data.passwordCheck &&
        !signupErrors.password &&
        !signupErrors.passwordCheck,
    );

  const handleVerifyEmail = async (data: AuthStepForm) => {
    if (!canProceedToPassword || isAuthVerifying) return;

    try {
      setIsAuthVerifying(true);
      const response = (await patchVerifyEmail(Number(data.authcode))) as {
        status: number;
      };

      if (response.status === 204) {
        setVerifiedInfo({ name: data.name, email: data.email });
        setStep("password");
        toast.success("이메일 인증이 완료되었습니다.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "인증코드가 일치하지 않습니다.",
      );
    } finally {
      setIsAuthVerifying(false);
    }
  };

  const onSubmit = (data: SignupStepForm) => {
    if (!verifiedInfo) {
      toast.error("이메일 인증이 필요합니다.");
      setStep("authCode");
      return;
    }

    if (step === "password" && isPasswordValid(data) && !isPending) {
      signupMutate({
        email: verifiedInfo.email,
        name: verifiedInfo.name,
        password: data.password,
      });
    }

    if (isSuccess) {
      router.push("/signin");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="SIGN UP">
        {step === "authCode" ? (
          <form
            className="flex flex-col w-full items-center gap-[3.625rem]"
            // eslint-disable-next-line react/jsx-no-bind
            onSubmit={() => void handleAuthSubmit(handleVerifyEmail)()}
          >
            <div className="flex flex-col gap-[0.75rem] self-stretch">
              <StepAuthCode
                control={authControl}
                isAuthButtonActive={isAuthCodeStepValid}
              />
            </div>
            <Button
              label="인증하기"
              state={
                canProceedToPassword && !isAuthVerifying
                  ? "default"
                  : "disabled"
              }
              type="submit"
              variant="blue"
            />
          </form>
        ) : (
          <form
            className="flex flex-col w-full items-center gap-[3.625rem]"
            // eslint-disable-next-line react/jsx-no-bind
            onSubmit={() => void handleSignupSubmit(onSubmit)()}
          >
            <div className="flex flex-col gap-[0.75rem] self-stretch">
              <StepPassword control={signupControl} />
            </div>
            <Button
              label="회원가입"
              state={isPending ? "disabled" : "default"}
              type="submit"
              variant="blue"
            />
          </form>
        )}
      </AuthForm>
    </div>
  );
};

export default SignupView;
