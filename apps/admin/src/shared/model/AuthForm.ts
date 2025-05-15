export interface SigninFormProps {
  email: string;
  password: string;
}

export interface SignupFormProps {
  email: string;
  password: string;
  name: string;
}

export interface AuthStepForm {
  email: string;
  authcode: string;
  name: string;
}

export interface SignupStepForm {
  password: string;
  passwordCheck: string;
}
