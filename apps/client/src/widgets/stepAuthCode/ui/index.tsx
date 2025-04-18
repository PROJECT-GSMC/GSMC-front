import React from 'react'
import { Input } from '@repo/ui/input'
import { Button } from '@repo/ui/button'
import { InputContainer } from '@repo/ui/widgets/inputContainer/index'
import { Control } from 'react-hook-form';
import { SignupFormProps } from "../../../shared/model/AuthForm";

export default function StepAuthCode({
  control,
  isAuthButtonActive
}: {
  control: Control<SignupFormProps>,
  isAuthButtonActive: boolean
}) {
  return (
    <>
      <InputContainer label="이름" >
        <Input name="name" control={control} rules={{
          required: "이름을 필수로 입력해야 합니다."
        }} />
      </InputContainer>
      <InputContainer label="이메일" >
        <div className="flex items-center justify-between gap-4">
          <Input name="email" control={control} rules={{
            required: "이메일을 필수로 입력해야 합니다.",
            pattern: {
              value: /^s\d{5}@gsm\.hs\.kr$/,
              message: "@gsm.hs.kr 학교 이메일을 입력해주세요"
            }
          }} />
          <Button
            label="인증번호"
            variant="blue"
            state={isAuthButtonActive ? "default" : "disabled"}
          />
        </div>
      </InputContainer>
      <InputContainer label="인증번호" >
        <Input name="authcode" control={control} rules={{
          required: "인증번호를 필수로 입력해야 합니다.",
        }} />
      </InputContainer>
    </>
  )
}