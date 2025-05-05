import { NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "@/shared/lib/setAuthCookies";
import { SigninFormProps } from "@/shared/model/AuthForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const signinData: SigninFormProps = {
      email: body.email,
      password: body.password,
    };

    const apiResponse = await fetch(`${API_URL}auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signinData),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse
        .json()
        .catch(() => ({ error: "알 수 없는 오류" }));
      return NextResponse.json(
        { error: errorData.error || "로그인에 실패했습니다." },
        { status: apiResponse.status }
      );
    }

    const response = await apiResponse.json();

    if (!response.accessToken || !response.refreshToken) {
      return NextResponse.json(
        { error: "인증 토큰이 없습니다." },
        { status: 500 }
      );
    }

    setAuthCookies(response.accessToken, response.refreshToken);

    return NextResponse.json({
      success: true,
      message: "로그인에 성공했습니다.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `로그인 처리 중 오류: ${error.message}`
            : "로그인 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
