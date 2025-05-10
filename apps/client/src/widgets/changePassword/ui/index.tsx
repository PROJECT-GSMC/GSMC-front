import React from 'react'
import { Control } from 'react-hook-form';

import { Input } from '@repo/ui/input'
import { InputContainer } from '@repo/ui/widgets/inputContainer/index'
import { ChangePasswordProps } from '@/shared/model/changePWForm';

export default function ChangePassword({ control }: { control: Control<ChangePasswordProps> }) {
  return (
    <>
      <InputContainer label="이메일">
        <Input
          name="email"
          control={control}
          rules={{
            required: "이메일을 필수로 입력해야 합니다.",
            pattern: {
              value: /^s\d{5}@gsm\.hs\.kr$/,
              message: "@gsm.hs.kr 학교 이메일을 입력해주세요",
            },
          }}
        />
      </InputContainer>
      <InputContainer label="새 비밀번호" >
        <Input
          name="newPassword"
          type="password"
          control={control}
          rules={{
            required: "비밀번호를 필수로 입력해야 합니다."
          }}
        />
      </InputContainer>
      <InputContainer label="새 비밀번호 확인" >
        <Input
          name="newPasswordCheck"
          type="password"
          control={control}
          rules={{
            required: "비밀번호 확인을 필수로 입력해야 합니다.",
            validate: (value, formValues) =>
              value === formValues.newPassword || "비밀번호가 일치하지 않습니다."
          }}
        />
      </InputContainer>
    </>
  )
}