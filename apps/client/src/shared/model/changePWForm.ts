export interface ChangePasswordProps {
  email: string;
  password: string;
}

export interface ChangePasswordForm extends ChangePasswordProps {
  passwordCheck: string;
}
