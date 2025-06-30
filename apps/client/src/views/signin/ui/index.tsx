"use client";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { setCookie } from "@repo/utils/setCookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { postSignin } from "@/entities/signin/api/postSignin";
import type { HttpError } from "@/shared/types/error";
import type { SigninFormProps } from "@shared/model/AuthForm";
import { AuthForm } from "@widgets/auth/ui";

const SigninView = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SigninFormProps>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const { mutate: signinMutate } = useMutation({
    mutationFn: (form: SigninFormProps) => postSignin(form),
    onSuccess: async (data) => {
      if (data.accessToken) {
        setCookie("accessToken", data.accessToken, 1);
      }
      if (data.refreshToken) {
        setCookie("refreshToken", data.refreshToken);
      }

      await queryClient.invalidateQueries({
        queryKey: ["auth"],
        exact: false,
      });

      router.push("/");
      return data;
    },
    onError: (error: HttpError) => {
      if (error.httpStatus == HttpStatusCode.Unauthorized) {
        toast.error("비밀번호가 올바르지 않습니다.");
      } else if (error.httpStatus == HttpStatusCode.NotFound) {
        toast.error("회원가입되지 않은 계정입니다.");
        router.push("signup");
      }
      throw error;
    },
  });

  const onSubmit = useCallback(
    (form: SigninFormProps) => {
      signinMutate(form);
    },
    [signinMutate],
  );

  const handleFormSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      void handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="LOG IN">
        <>
          <form
            className="flex flex-col items-center w-full gap-[3.625rem]"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col gap-[0.75rem] self-stretch">
              <InputContainer label="이메일">
                <Input
                  isEmail
                  control={control}
                  name="email"
                  rules={{
                    required: "이메일을 필수로 입력해야 합니다.",
                    pattern: {
                      value: /^s\d{5}@gsm\.hs\.kr$/,
                      message: "@gsm.hs.kr 학교 이메일을 입력해주세요",
                    },
                  }}
                />
              </InputContainer>
              <InputContainer label="비밀번호">
                <Input
                  control={control}
                  name="password"
                  rules={{
                    required: "비밀번호을 필수로 입력해야 합니다.",
                    minLength: {
                      value: 8,
                      message: "영문, 숫자를 포함한 8자 이상으로 입력해주세요.",
                    },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
                      message: "영문, 숫자를 포함한 비밀번호를 입력해주세요.",
                    },
                  }}
                />
              </InputContainer>
            </div>
            <Button
              label="로그인"
              state={isValid ? "default" : "disabled"}
              type="submit"
              variant="blue"
            />
          </form>
          <Link
            className="text-blue-400 text-sm mt-2 underline-offset-auto underline"
            href="/signup"
          >
            회원가입
          </Link>
        </>
      </AuthForm>
    </div>
  );
};

export default SigninView;
