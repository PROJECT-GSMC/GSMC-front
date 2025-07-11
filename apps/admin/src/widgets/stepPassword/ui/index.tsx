import { Button } from "@repo/shared/button";
import { EyeClose } from "@repo/shared/eyeClose";
import { EyeOpen } from "@repo/shared/eyeOpen";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import React, { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

import type { StepPasswordForm } from "@/shared/model/signup";



const StepPassword = ({ isHeader = false }: { isHeader?: boolean }) => {
  const { control, watch, formState: { errors, isValid } } = useFormContext<StepPasswordForm>()
  const password = watch("password")

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false)

  const handleShowPassword = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  const handleShowPasswordCheck = useCallback(() => {
    setShowPasswordCheck(!showPasswordCheck)
  }, [showPasswordCheck])
  return (
    <>
      <InputContainer error={errors.password} htmlFor="password" label="비밀번호">
        <div className="relative w-full">
          <Input
            className="pr-10"
            control={control}
            name="password"
            rules={{
              required: "비밀번호를 필수로 입력해야 합니다.",
              minLength: {
                value: 8,
                message: "영문, 숫자를 포함한 8자 이상으로 입력해주세요.",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
                message: "영문, 숫자를 포함한 비밀번호를 입력해주세요.",
              },
            }}
            type={showPassword ? "text" : "password"}
          />
          <button
            className="absolute w-6 h-6 top-[0.75rem] right-3 text-gray-500 hover:text-gray-700"
            type="button"
            onClick={handleShowPassword}
          >
            {showPassword ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
      </InputContainer>
      <InputContainer error={errors.passwordCheck} htmlFor="passwordCheck" label="비밀번호 확인">
        <div className="relative w-full">
          <Input
            className="pr-10"
            control={control}
            name="passwordCheck"
            rules={{
              required: "비밀번호 확인을 필수로 입력해야 합니다.",
              minLength: {
                value: 8,
                message: "영문, 숫자를 포함한 8자 이상으로 입력해주세요.",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d).*$/,
                message: "영문, 숫자를 포함한 비밀번호를 입력해주세요.",
              },
              validate: (passwordCheck) => passwordCheck === password || "비밀번호가 일치하지 않습니다.",
            }}
            type={showPasswordCheck ? "text" : "password"}
          />
          <button
            className="absolute w-6 h-6 top-[0.75rem] right-3 text-gray-500 hover:text-gray-700"
            type="button"
            onClick={handleShowPasswordCheck}
          >
            {showPasswordCheck ? <EyeOpen /> : <EyeClose />}
          </button>
        </div>
      </InputContainer>
      <Button
        label={isHeader ? "비밀번호 변경" : "회원가입"}
        state={isValid ? "default" : "disabled"}
        type="submit"
        variant="blue"
      />
    </>
  );
}

export { StepPassword }