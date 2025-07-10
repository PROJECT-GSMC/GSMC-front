import type { StepAuthCodeForm } from "./signup";

export interface ChangePasswordProps {
  email: string;
  password: string;
}

export type ChangePassword_StepAuthCodeForm = Omit<StepAuthCodeForm, "name">;
