"use client";

import { postSignin } from "@/entities/signin/api/postSignin";
import type { HttpError } from "@/shared/model/error";
import type { SigninFormProps } from "@/shared/model/signin";
import { Button } from "@repo/shared/button";
import { EyeClose } from "@repo/shared/eyeClose";
import { EyeOpen } from "@repo/shared/eyeOpen";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { setCookie } from "@repo/utils/setCookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthForm } from "@widgets/auth/ui";
import { HttpStatusCode } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SigninView = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
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
    },
    onError: (error: HttpError) => {
      if (error.httpStatus == HttpStatusCode.Unauthorized) {
        toast.error("비밀번호가 올바르지 않습니다.");
      } else if (error.httpStatus == HttpStatusCode.NotFound) {
        toast.error("회원가입되지 않은 계정입니다.");
        router.push("signup");
      }
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

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="LOG IN">
        <>
          <form
            className="flex flex-col items-center w-full gap-[3.625rem]"
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col gap-[0.75rem] self-stretch">
              <InputContainer error={errors.email} htmlFor="email" label="이메일">
                <Input
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
              <InputContainer error={errors.password} htmlFor="password" label="비밀번호">
                <div className="relative w-full">
                  <Input
                    className="pr-10"
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
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="absolute w-6 h-6 top-[0.75rem] right-3 text-gray-500 hover:text-gray-700"
                    type="button"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <EyeOpen /> : <EyeClose />}
                  </button>
                </div>
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
