"use client";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { AuthForm } from "../../../widget/auth/ui";
import { useForm } from "react-hook-form";
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";
import { SigninFormProps } from "../../../shared/model/AuthForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { postSignin } from "../../../entities/signin/api/postSignin";

const LoginWidget = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SigninFormProps>({ mode: "onChange", defaultValues: { email: "", password: "" } });

  const onSubmit = async (form: SigninFormProps) => {
    try {
      await postSignin(form);
      router.push("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "로그인에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="LOG IN">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-[25rem] gap-[3.625rem]">
          <div className="flex flex-col gap-[0.75rem] self-stretch">
            <InputContainer label="이메일">
              <Input
                name="email"
                control={control}
                rules={{
                  required: "이메일을 필수로 입력해야 합니다.",
                  pattern: {
                    value: /^(?=.*@).{4,}$/,
                    message: "이메일을 입력해주세요",
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

export default LoginWidget;
