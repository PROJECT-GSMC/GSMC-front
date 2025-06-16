export interface ChangePasswordProps {
  email: string;
  newPassword: string;
}

export interface ChangePasswordForm extends ChangePasswordProps {
  newPasswordCheck: string;
}
