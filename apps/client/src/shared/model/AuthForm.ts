export interface LoginFormProps {
  email: string;
  password: string;
}

export interface SignupFormProps extends LoginFormProps {
  name: string;
  authcode: string;
}
