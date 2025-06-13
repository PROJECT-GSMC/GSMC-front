import type { role } from "@repo/types/member";

export interface SigninFormProps {
  email: string;
  password: string;
}

export interface SigninFormResponse {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  role: role;
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

export interface SignupFormProps {
  email: string;
  password: string;
  name: string;
}
