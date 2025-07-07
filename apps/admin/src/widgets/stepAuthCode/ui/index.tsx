import { postSendEmail } from "@entities/signup/api/postSendEmail";
import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { type AuthStepForm } from "@shared/model/AuthForm";
import { useCallback, useState } from "react";
import { useWatch, type Control } from "react-hook-form";
import { toast } from "sonner";


export default function StepAuthCode({
  control,
  isAuthButtonActive,
}: {
  control: Control<AuthStepForm>;
  isAuthButtonActive: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const email = useWatch({
    control,
    name: "email",
  });

  const handleAuthButtonClick = useCallback(
    function () {
      if (!isAuthButtonActive || isLoading) return;

      setIsLoading(true);
      void postSendEmail(email)
        .catch((error) => {
          toast.error(String(error));
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [email, isAuthButtonActive, isLoading],
  );

  return (
    <>
      <InputContainer label="이름">
        <Input
          control={control}
          name="name"
          rules={{
            required: "이름을 필수로 입력해야 합니다.",
          }}
        />
      </InputContainer>
      <InputContainer label="이메일">
        <div className="flex items-center justify-between gap-4">
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
          <Button
            className="max-w-max"
            label={isLoading ? "전송 중..." : "인증번호"}
            state={isAuthButtonActive && !isLoading ? "default" : "disabled"}
            type="submit"
            variant="blue"
            onClick={handleAuthButtonClick}
          />
        </div>
      </InputContainer>
      <InputContainer label="인증번호">
        <Input
          control={control}
          name="authcode"
          rules={{
            required: "인증번호를 필수로 입력해야 합니다.",
          }}
        />
      </InputContainer>
    </>
  );
}
