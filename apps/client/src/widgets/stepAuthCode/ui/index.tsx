import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import React, { useCallback, useState } from "react";
import { type Control, useWatch } from "react-hook-form";
import { toast } from "sonner";

import type { ChangePassword_StepAuthCodeForm } from "@/shared/model/changePWForm";
import { postSendEmail } from "@entities/signup/api/postSendEmail";
import type { StepAuthCodeForm } from "@shared/model/signup";

interface StepAuthCodeBaseProps {
  isAuthButtonActive: boolean;
}

interface StepAuthCodeWithNameProps extends StepAuthCodeBaseProps {
  control: Control<StepAuthCodeForm>;
  hasName: true;
}

interface StepAuthCodeWithoutNameProps extends StepAuthCodeBaseProps {
  control: Control<ChangePassword_StepAuthCodeForm>;
  hasName?: false;
}

type StepAuthCodeProps =
  | StepAuthCodeWithNameProps
  | StepAuthCodeWithoutNameProps;

export default function StepAuthCode(props: StepAuthCodeProps) {
  const { control, isAuthButtonActive, hasName = false } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const email = useWatch({
    control: control as Control<StepAuthCodeForm | ChangePassword_StepAuthCodeForm>,
    name: "email",
  });

  const handleAuthButtonClick = useCallback(() => {
    const sendEmail = async () => {
      if (isAuthButtonActive && !isLoading) {
        try {
          setIsLoading(true);

          await postSendEmail(email);
          toast.success("인증번호가 전송되었습니다.");
          setShow(true);
        } catch (error) {
          toast.error(String(error));
        } finally {
          setIsLoading(false);
        }
      }
    };
    void sendEmail();
  }, [email, isAuthButtonActive, isLoading]);

  return (
    <>
      {hasName ? (
        <InputContainer label="이름">
          <Input
            control={props.control as Control<StepAuthCodeForm>}
            name="name"
            rules={{
              required: "이름을 필수로 입력해야 합니다.",
            }}
          />
        </InputContainer>
      ) : null}

      <InputContainer label="이메일">
        <div className="flex items-center justify-between gap-4">
          <Input
            control={control as Control<StepAuthCodeForm | ChangePassword_StepAuthCodeForm>}
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
            type="button"
            variant="blue"
            onClick={handleAuthButtonClick}
          />
        </div>
      </InputContainer>

      <InputContainer label="인증번호">
        <Input
          control={control as Control<StepAuthCodeForm | ChangePassword_StepAuthCodeForm>}
          name="authcode"
          rules={{
            required: "인증번호를 필수로 입력해야 합니다.",
          }}
        />
      </InputContainer>

      {show ? (
        <div className="text-sm text-[#e61919]">
          <strong>인증 코드를 찾을 수 없나요?</strong> 스팸메일함을 확인해
          주세요.
        </div>
      ) : null}
    </>
  );
}
