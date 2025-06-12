import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import type { Control } from "react-hook-form";

import type { SignupStepForm } from "@/shared/model/AuthForm";

export default function StepPassword({
  control,
}: {
  control: Control<SignupStepForm>;
}) {
  return (
    <>
      <InputContainer label="비밀번호">
        <Input
          control={control}
          name="password"
          rules={{
            required: "비밀번호를 필수로 입력해야 합니다.",
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
