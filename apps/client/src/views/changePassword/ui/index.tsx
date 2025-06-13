"use client";

import { Button } from "@repo/shared/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { patchPassword } from "@/shared/api/patchPassword";
import type { ChangePasswordProps } from "@/shared/model/changePWForm";
import ChangePassword from "@/widgets/changePassword/ui";
import { AuthForm } from "@widgets/auth/ui";

const ChangePasswordView = () => {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ChangePasswordProps>({
    mode: "onChange",
    defaultValues: { email: "", newPassword: "", newPasswordCheck: "" },
  });

  const { mutate: changePWMutate } = useMutation({
    mutationFn: (form: ChangePasswordProps) => patchPassword(form),
    onSuccess: () => { router.push("/"); },
    onError: (error: Error) => {
      throw error;
    },
  });

  const onSubmit = (form: ChangePasswordProps) => {
    changePWMutate(form);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="Change Password">
        <form
          className="flex flex-col items-center w-full gap-[3.625rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[0.75rem] self-stretch">
            <ChangePassword control={control} />
          </div>
          <Button
            label="비밀번호 변경"
            state={isValid ? "default" : "disabled"}
            variant="blue"
          />
        </form>
      </AuthForm>
    </div>
  );
};

export default ChangePasswordView;
