import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import React, { useCallback, useState } from "react";
import { type Control, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { postSendEmail } from "@entities/signup/api/postSendEmail";
import type { AuthStepForm } from "@shared/model/AuthForm";

export default function StepAuthCode({
  control,
  isAuthButtonActive,
}: {
  control: Control<AuthStepForm>;
  isAuthButtonActive: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const email = useWatch({
    control,
    name: "email",
  });

  const handleAuthButtonClick = useCallback(async () => {
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
  }, [email, isAuthButtonActive, isLoading]);

  const handleAuthCodeClick = useCallback(async () => {
    await handleAuthButtonClick()
    setShow(true)
  }, [handleAuthButtonClick])

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
            onClick={handleAuthCodeClick}
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
      {show ? <div className="text-sm text-[#e61919]"><strong>인증 코드를 찾을 수 없나요?</strong> 스팸메일함을 확인해 주세요.</div> : null}
    </>
  );
}
