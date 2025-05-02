import { NextResponse } from "next/server";

export function setAuthCookies(
  accessToken: string,
  refreshToken: string
): NextResponse {
  const response = NextResponse.json({
    success: true,
    message: "로그인에 성공했습니다.",
  });

  response.cookies.set("accessToken", accessToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  response.cookies.set("refreshToken", refreshToken, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
