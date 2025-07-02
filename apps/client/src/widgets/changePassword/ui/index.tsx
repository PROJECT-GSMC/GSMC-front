import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import React from "react";
import type { Control } from "react-hook-form";

import type { StepChangePasswordForm } from "@/shared/model/changePWForm";

export default function ChangePassword({
  control,
}: {
  control: Control<StepChangePasswordForm>;
}) {
  return (
    <>
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
