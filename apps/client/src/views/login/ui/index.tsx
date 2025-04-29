"use client";
import { useForm } from "react-hook-form";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
<<<<<<< HEAD:apps/client/src/widgets/login/ui/index.tsx
import { AuthForm } from "../../../widgets/auth/ui";
import { useForm } from "react-hook-form";
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";
import { SigninFormProps } from "../../../shared/model/AuthForm";
import { postSignin } from "../../../entities/signin/api/postSignin";
=======
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";
>>>>>>> 389aa171a86d32087fda5a5d1903074ee13f20e0:apps/client/src/views/login/ui/index.tsx

import { AuthForm } from "@widgets/auth/ui";
import { usePostSignin } from "@entities/signin/model/usePostSignin";
import { SigninFormProps } from "@shared/model/AuthForm";

const LoginView = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SigninFormProps>({ mode: "onChange", defaultValues: { email: "", password: "" } });

  const onSubmit = (form: SigninFormProps) => {
    postSignin(form);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="LOG IN">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full gap-[3.625rem]">
          <div className="flex flex-col gap-[0.75rem] self-stretch">
            <InputContainer label="이메일">
              <Input
                name="email"
                control={control}
                suffix="@gsm.hs.kr"
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
          <Button label="로그인" variant="blue" state={isValid ? "default" : "disabled"} />
        </form>
      </AuthForm>
    </div>
  );
};

export default LoginView;
