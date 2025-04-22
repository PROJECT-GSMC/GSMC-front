export interface SigninFormProps {
  email: string;
  password: string;
}

export interface SignupFormProps extends SigninFormProps {
  name: string;
  authcode: string;
  passwordCheck: string;
}
