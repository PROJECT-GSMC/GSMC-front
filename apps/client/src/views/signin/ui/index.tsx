"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Input } from "@repo/shared/input";
import { Button } from "@repo/shared/button";
import { InputContainer } from "@repo/shared/inputContainer";

import { AuthForm } from "@widgets/auth/ui";
import { SigninFormProps } from "@shared/model/AuthForm";

import { postSignin } from "@/entities/signin/api/postSignin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "@repo/utils/setCookie";
import { HttpError } from "@/shared/types/error";
import { toast } from "sonner";

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
    onSuccess: (data) => {
      if (data.accessToken) {
        setCookie("accessToken", data.accessToken, 1);
      }
      if (data.refreshToken) {
        setCookie("refreshToken", data.refreshToken);
      }

      queryClient.invalidateQueries({
        queryKey: ["auth"],
        exact: false,
      });
      router.push("/");
      return data;
    },
    onError: (error: HttpError) => {
      if (error.httpStatus == 401) {
        toast.error("비밀번호가 올바르지 않습니다.");
      } else if (error.httpStatus == 404) {
        toast.error("회원가입되지 않은 계정입니다.");
        router.push("signup");
      }
      throw error;
    },
  });

  const onSubmit = (form: SigninFormProps) => {
    signinMutate(form);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="LOG IN">
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full gap-[3.625rem]"
          >
            <div className="flex flex-col gap-[0.75rem] self-stretch">
              <InputContainer label="이메일">
                <Input
                  isEmail
                  name="email"
                  control={control}
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
                  name="password"
                  control={control}
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
              variant="blue"
              state={isValid ? "default" : "disabled"}
              type="submit"
            />
          </form>
          <Link
            className="text-blue-400 text-sm mt-2 underline-offset-auto underline"
            href={"/signup"}
          >
            회원가입
          </Link>
        </>
      </AuthForm>
    </div>
  );
};

export default SigninView;
