"use client";

import { Button } from "@repo/shared/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { patchVerifyEmail } from "@/entities/signup/api/patchVerifyEmail";
import { patchPassword } from "@/shared/api/patchPassword";
import type {
  ChangePasswordStepForm,
  ChangePasswordProps,
  ChangePW_AuthStepForm,
} from "@/shared/model/changePWForm";
import type { HttpError } from "@/shared/types/error";
import ChangePassword from "@/widgets/changePassword/ui";
import StepAuthCode from "@/widgets/stepAuthCode/ui";
import { AuthForm } from "@widgets/auth/ui";

const ChangePasswordView = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [step, setStep] = useState("authCode");
  const [isAuthVerifying, setIsAuthVerifying] = useState(false);
  const [verifiedInfo, setVerifiedInfo] = useState<{ email: string } | null>(
    null,
  );

  const { mutate: changePWMutate, isPending } = useMutation({
    mutationFn: (form: ChangePasswordProps) => patchPassword(form),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["auth"],
        exact: false,
      });
      if (data.status === 204) {
        toast.success("비밀번호 변경 성공");
        router.push("/signin");
      }
    },
    onError: (error: HttpError) => {
      if (error.httpStatus === HttpStatusCode.Unauthorized) {
        toast.error("이메일 인증을 먼저 진행해주세요.");
      } else {
        toast.error("비밀번호 변경에 실패했습니다.");
      }
    },
  });

  const {
    control: authControl,
    handleSubmit: handleAuthSubmit,
    watch: watchAuth,
    formState: { errors: authErrors },
  } = useForm<ChangePW_AuthStepForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      authcode: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors: changePWErrors, isValid },
  } = useForm<ChangePasswordStepForm>({
    mode: "onChange",
    defaultValues: { password: "", passwordCheck: "" },
  });

  const watchedAuthValues = watchAuth();

  const isAuthCodeStepValid = Boolean(
    watchedAuthValues.email &&
      /^s\d{5}@gsm\.hs\.kr$/.test(watchedAuthValues.email) &&
      !authErrors.email,
  );

  const canProceedToPassword =
    isAuthCodeStepValid &&
    Boolean(
      watchedAuthValues.authcode &&
        watchedAuthValues.authcode.length >= 8 &&
        !authErrors.authcode,
    );

  const isPasswordValid = useCallback(
    (data: ChangePasswordStepForm) =>
      Boolean(
        data.password &&
          data.passwordCheck &&
          data.password === data.passwordCheck &&
          !changePWErrors.password &&
          !changePWErrors.passwordCheck,
      ),
    [changePWErrors.password, changePWErrors.passwordCheck],
  );

  const handleVerifyEmail = useCallback(
    async (data: ChangePW_AuthStepForm) => {
      if (!canProceedToPassword || isAuthVerifying) return;

      try {
        setIsAuthVerifying(true);
        const response = await patchVerifyEmail(Number(data.authcode));

        if (response.status === 204) {
          setVerifiedInfo({ email: data.email });
          setStep("password");
          toast.success("이메일 인증이 완료되었습니다.");
        }
      } catch {
        toast.error("인증코드가 일치하지 않습니다.");
      } finally {
        setIsAuthVerifying(false);
      }
    },
    [canProceedToPassword, isAuthVerifying],
  );

  const onSubmit = useCallback(
    (data: ChangePasswordStepForm) => {
      if (!verifiedInfo) {
        toast.error("이메일 인증이 필요합니다.");
        setStep("authCode");
        return;
      }

      if (step === "password" && isPasswordValid(data) && !isPending) {
        changePWMutate({
          email: verifiedInfo.email,
          password: data.password,
        });
      }
    },
    [changePWMutate, isPasswordValid, isPending, step, verifiedInfo],
  );

  const handleAuthCodeSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      void handleAuthSubmit(handleVerifyEmail)(e);
    },
    [handleAuthSubmit, handleVerifyEmail],
  );

  const handleChangePassword = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="Change Password">
        {step === "authCode" ? (
          <form
            className="flex flex-col w-full items-center gap-[3.625rem]"
            onSubmit={handleAuthCodeSubmit}
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
            className="flex flex-col items-center w-full gap-[3.625rem]"
            onSubmit={handleChangePassword}
          >
            <div className="flex flex-col gap-[0.75rem] self-stretch">
              <ChangePassword control={control} />
            </div>
            <Button
              label="비밀번호 변경"
              state={isValid ? "default" : "disabled"}
              type="submit"
              variant="blue"
            />
          </form>
        )}
      </AuthForm>
    </div>
  );
};

export default ChangePasswordView;
