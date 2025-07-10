import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { patchVerifyEmail } from "@/entities/signup/api/patchVerifyEmail";
import type { ChangePassword_StepAuthCodeForm } from "@/shared/model/changePassword";
import type { HttpError } from "@/shared/model/error";
import { postSendEmail } from "@entities/signup/api/postSendEmail";
import type { StepAuthCodeForm } from "@shared/model/signup";

const StepAuthcode = ({ setStep }: { setStep: (step: string) => void }) => {
  const { control, watch, formState: { errors, isValid } } = useFormContext<StepAuthCodeForm | ChangePassword_StepAuthCodeForm>()
  const email = watch("email")
  const authcode = watch("authcode")

  const { mutate: sendEmailMutate, isPending: isSendEmailPending, isSuccess: isSendEmailSuccess } = useMutation({
    mutationFn: (email: string) => postSendEmail(email),
    onSuccess: (data) => {
      if (data.status == 204) {
        toast.success("인증번호가 전송되었습니다.");
      }
    },
    onError: (error: HttpError) => {
      if (error.httpStatus == HttpStatusCode.BadRequest) {
        toast.error("인증번호 전송을 실패하였습니다.")
      } else {
        toast.error("인증번호 전송을 실패하였습니다.")
      }
    }
  })

  const { mutate: verifyEmailMutate, isSuccess: isVerifyEmail } = useMutation({
    mutationFn: (authcode: string) => patchVerifyEmail(Number(authcode)),
    onSuccess: (data) => {
      if (data.status == 204) {
        setStep("password");
        toast.success("이메일 인증이 완료되었습니다.");
      }
    },
    onError: (error: HttpError) => {
      if (error.httpStatus == HttpStatusCode.BadRequest) {
        toast.error("올바르지 않은 인증코드입니다.")
      } else if (error.httpStatus == HttpStatusCode.Unauthorized) {
        toast.error("유효하지 않거나 만료된 인증코드입니다.")
      }
    }
  })

  const handlePostSendEmail = useCallback(() => {
    sendEmailMutate(email)
  }, [email, sendEmailMutate])

  const handlePatchVerifyEmail = useCallback(() => {
    verifyEmailMutate(authcode)
    if (isVerifyEmail && isValid) {
      setStep("password")
    }
  }, [authcode, isValid, isVerifyEmail, setStep, verifyEmailMutate])

  return (
    <>
      {"name" in control._defaultValues &&
        <InputContainer error={"name" in errors ? errors.name : undefined} htmlFor="name" label="이름">
          <Input
            control={control}
            name="name"
            rules={{
              required: "이름을 필수로 입력해야 합니다.",
            }}
          />
        </InputContainer>}
      <InputContainer error={errors.email} htmlFor="email" label="이메일">
        <div className="flex gap-4 w-full">
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
            label={isSendEmailPending ? "전송 중..." : "인증번호"}
            state={isSendEmailPending ? "disabled" : "default"}
            type="button"
            variant="blue"
            onClick={handlePostSendEmail}
          />
        </div>
      </InputContainer>
      <InputContainer error={errors.authcode} htmlFor="authcode" label="인증번호">
        <Input
          control={control}
          name="authcode"
          rules={{
            required: "인증번호를 필수로 입력해야 합니다.",
            maxLength: {
              value: 8,
              message: "인증번호는 8자리 이하의 숫자입니다."
            }
          }}
        />
      </InputContainer>
      <Button
        label="인증하기"
        state={isValid ? "default" : "disabled"}
        type="button"
        variant="blue"
        onClick={handlePatchVerifyEmail}
      />
      {isSendEmailSuccess ?
        <div className="text-sm text-[#e61919]">
          <strong>인증 코드를 찾을 수 없나요?</strong>스팸메일함을 확인해주세요.
        </div> : null}
    </>
  );
}

export { StepAuthcode }