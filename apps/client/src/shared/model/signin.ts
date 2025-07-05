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
