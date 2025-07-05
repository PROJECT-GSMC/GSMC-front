import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import React from "react";
import type { Control } from "react-hook-form";

import type { StepPasswordForm } from "@/shared/model/signup";

export default function StepPassword({
  control,
}: {
  control: Control<StepPasswordForm>;
}) {
  return (
    <>
      <InputContainer label="비밀번호">
        <Input
          control={control}
          name="password"
          rules={{
            required: "비밀번호를 필수로 입력해야 합니다.",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.",
            },
          }}
          type="password"
        />
      </InputContainer>
      <InputContainer label="비밀번호 확인">
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
