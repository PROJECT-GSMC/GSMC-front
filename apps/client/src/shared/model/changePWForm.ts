import type { AuthStepForm } from "./AuthForm";

export interface ChangePasswordProps {
  email: string;
  password: string;
}

export type ChangePW_AuthStepForm = Omit<AuthStepForm, "name">;

export interface ChangePasswordStepForm {
  password: string;
  passwordCheck: string;
}
