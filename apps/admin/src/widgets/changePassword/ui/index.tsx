import type { ChangePasswordForm } from "@/shared/model/changePWForm";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import React from "react";
import type { Control } from "react-hook-form";

export default function ChangePassword({
  control,
}: {
  control: Control<ChangePasswordForm>;
}) {
  return (
    <>
      <InputContainer label="이메일">
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
      <InputContainer label="새 비밀번호">
        <Input
          control={control}
          name="password"
          rules={{
            required: "비밀번호를 필수로 입력해야 합니다.",
          }}
          type="password"
        />
      </InputContainer>
      <InputContainer label="새 비밀번호 확인">
        <Input
          control={control}
          name="passwordCheck"
          rules={{
            required: "비밀번호 확인을 필수로 입력해야 합니다.",
            validate: (value, formValues) =>
              value === formValues.password || "비밀번호가 일치하지 않습니다.",
          }}
          type="password"
        />
      </InputContainer>
    </>
  );
}
