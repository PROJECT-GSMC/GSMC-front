"use client";


import { Button } from "@repo/shared/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { patchPassword } from "@/shared/api/patchPassword";
import type { ServerResponse } from "@/shared/model/AuthForm";
import type { ChangePasswordForm, ChangePasswordProps } from "@/shared/model/changePWForm";
import type { HttpError } from "@/shared/types/error";
import ChangePassword from "@/widgets/changePassword/ui";
import { AuthForm } from "@widgets/auth/ui";

const ChangePasswordView = () => {
  const router = useRouter()

  const { mutate: changePWMutate } = useMutation<ServerResponse, HttpError, ChangePasswordProps>({
    mutationFn: patchPassword,
    onSuccess: (data) => {
      if (data.success)
        router.push("/");
    },
    onError: (error: Error) => {
      throw error;
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ChangePasswordForm>({
    mode: "onChange",
    defaultValues: { email: "", newPassword: "", newPasswordCheck: "" },
  });

  const onSubmit = useCallback((form: ChangePasswordProps) => {
    changePWMutate({
      email: form.email,
      newPassword: form.newPassword
    });
  }, [changePWMutate]);

  const handleChangePassword = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    void handleSubmit(onSubmit)(e);
  }, [handleSubmit, onSubmit]);

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="Change Password">
        <form
          className="flex flex-col items-center w-full gap-[3.625rem]"
          onSubmit={handleChangePassword}
        >
          <div className="flex flex-col gap-[0.75rem] self-stretch">
            <ChangePassword control={control} />
          </div>
          <Button
            label="비밀번호 변경"
            state={isValid ? "default" : "disabled"}
            type="submit"
            variant="blue"
          />
        </form>
      </AuthForm>
    </div>
  );
};

export default ChangePasswordView;