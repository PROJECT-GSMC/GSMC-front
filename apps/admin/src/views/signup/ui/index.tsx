"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { postSignup } from "@/entities/signup/api/postSignup";
import type { HttpError } from "@/shared/model/error";
import type {
  SignupFormProps,
  StepAuthCodeForm,
  StepPasswordForm
} from "@/shared/model/signup"
import { StepAuthcode } from "@/widgets/stepAuthcode/ui";
import { StepPassword } from "@/widgets/stepPassword/ui";
import { AuthForm } from "@widgets/auth/ui";



const SignupView = () => {
  const [step, setStep] = useState("authCode");
  const queryClient = useQueryClient();
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      name: '',
      email: '',
      authcode: '',
      password: '',
      passwordCheck: ''
    },
    mode: "onChange"
  })

  const { mutate: signupMutate } = useMutation({
    mutationFn: (form: SignupFormProps) => postSignup(form),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["auth"],
        exact: false,
      });
      if (data.status === 201) {
        toast.success("회원가입 성공");
        router.push("/signin");
      }
    },
    onError: (error: HttpError) => {
      if (error.httpStatus === HttpStatusCode.Unauthorized) {
        toast.error("이메일 인증을 먼저 진행해주세요.");
      } else if (error.httpStatus === HttpStatusCode.Conflict) {
        toast.error("이미 회원가입 된 계정입니다.");
      } else {
        toast.error("회원가입에 실패했습니다.");
      }
    },
  });

  const handlePostSignup = useCallback((form: StepAuthCodeForm & StepPasswordForm) => {
    signupMutate({
      name: form.name,
      email: form.email,
      password: form.password
    })
  }, [signupMutate])

  const onSubmit = useCallback(async () => {
    await methods.handleSubmit(handlePostSignup)()
  }, [handlePostSignup, methods])

  return (
    <div className="flex justify-center items-center h-screen bg-tropicalblue-100">
      <AuthForm label="SIGN UP">
        <FormProvider {...methods}>
          <Form className="w-full" onSubmit={onSubmit}>
            {step === "authCode" &&
              <div className="flex flex-col gap-[0.75rem] self-stretch">
                <StepAuthcode setStep={setStep} />
              </div>
            }
            {step === "password" &&
              <div className="flex flex-col gap-[0.75rem] self-stretch">
                <StepPassword />
              </div>
            }
          </Form>
        </FormProvider>
      </AuthForm>
    </div>
  );
};

export default SignupView;
