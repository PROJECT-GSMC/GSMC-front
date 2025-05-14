import React from 'react'
import { Control } from 'react-hook-form';

import { Input } from '@repo/ui/input'
import { InputContainer } from '@repo/ui/widgets/inputContainer/index'

import { SignupStepForm } from '@shared/model/AuthForm';

export default function StepPassword({ control }: { control: Control<SignupStepForm> }) {
  return (
    <>
      <InputContainer label="비밀번호" >
        <Input
          name="password"
          type="password"
          control={control}
          rules={{
            required: "비밀번호를 필수로 입력해야 합니다."
          }}
        />
      </InputContainer>
      <InputContainer label="비밀번호 확인" >
        <Input
          name="passwordCheck"
          type="password"
          control={control}
          rules={{
            required: "비밀번호 확인을 필수로 입력해야 합니다.",
            validate: (value, formValues) =>
              value === formValues.password || "비밀번호가 일치하지 않습니다."
          }}
        />
      </InputContainer>
    </>
  )
}