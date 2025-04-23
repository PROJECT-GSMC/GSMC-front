import React, { useState } from "react";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";
import { Control, useWatch } from "react-hook-form";
import { SignupFormProps } from "../../../shared/model/AuthForm";
import { postSendEmail } from "../../../entities/signup/api/postSendEmail";
import { toast } from "sonner";

export default function StepAuthCode({
  control,
  isAuthButtonActive,
}: {
  control: Control<SignupFormProps>;
  isAuthButtonActive: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const email = useWatch({
    control,
    name: "email",
  });

  const handleAuthButtonClick = async () => {
    if (isAuthButtonActive && !isLoading) {
      try {
        setIsLoading(true);

        await postSendEmail(email);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <InputContainer label="이름">
        <Input
          name="name"
          control={control}
          rules={{
            required: "이름을 필수로 입력해야 합니다.",
          }}
        />
      </InputContainer>
      <InputContainer label="이메일">
        <div className="flex items-center justify-between gap-4">
          <Input
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
          <Button
            label={isLoading ? "전송 중..." : "인증번호"}
            variant="blue"
            state={isAuthButtonActive && !isLoading ? "default" : "disabled"}
            onClick={handleAuthButtonClick}
          />
        </div>
      </InputContainer>

      <InputContainer label="인증번호">
        <Input
          name="authcode"
          control={control}
          rules={{
            required: "인증번호를 필수로 입력해야 합니다.",
          }}
        />
      </InputContainer>
    </>
  );
}
