export interface AuthForm {
  email: string;
  password: string;
}

export interface SignupForm extends AuthForm {
  name: string;
}
