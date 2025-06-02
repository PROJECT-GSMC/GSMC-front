"use client";

import { useForm } from "react-hook-form";

import { Button } from "@repo/shared/button";

import { AuthForm } from "@widgets/auth/ui";

import { useMutation } from "@tanstack/react-query";
import { patchPassword } from "@/shared/api/patchPassword";
import { ChangePasswordProps } from "@/shared/model/changePWForm";
import ChangePassword from "@/widgets/changePassword/ui";
import { useRouter } from "next/navigation";

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
    onSuccess: () => router.push("/"),
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
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full gap-[3.625rem]"
          >
            <div className="flex flex-col gap-[0.75rem] self-stretch">
              <ChangePassword control={control} />
            </div>
            <Button
              label="비밀번호 변경"
              variant="blue"
              state={isValid ? "default" : "disabled"}
            />
          </form>
        </>
      </AuthForm>
    </div>
  );
};

export default ChangePasswordView;
