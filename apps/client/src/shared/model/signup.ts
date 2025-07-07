export interface SignupFormProps {
  email: string;
  password: string;
  name: string;
}
export interface StepAuthCodeForm {
  email: string;
  authcode: string;
  name: string;
}

export interface StepPasswordForm {
  password: string;
  passwordCheck: string;
}
