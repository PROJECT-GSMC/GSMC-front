import { NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "../../../src/shared/lib/setAuthCookies";
import { SigninFormProps } from "../../../src/shared/model/AuthForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json({ error: "이메일과 비밀번호를 입력해주세요." }, { status: 400 });
    }

    const signinData: SigninFormProps = {
      email: body.email,
      password: body.password,
    };

    const apiResponse = await fetch(`${API_URL}auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({ error: "알 수 없는 오류" }));
      console.error("API 응답 실패:", apiResponse.status, errorData);
      return NextResponse.json({ error: errorData.error || "로그인에 실패했습니다." }, { status: apiResponse.status });
    }

    const response = await apiResponse.json();

    if (response.accessToken && response.refreshToken) {
      await setAuthCookies(response.accessToken, response.refreshToken);
    } else {
      return NextResponse.json({ error: "인증 토큰이 없습니다." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "로그인에 성공했습니다.",
    });
  } catch (error) {
    console.error("로그인 처리 중 오류 발생:", error);
    if (error instanceof Error) {
      console.error("오류 메시지:", error.message);
      console.error("오류 스택:", error.stack);
      return NextResponse.json({ error: `로그인 처리 중 오류: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "로그인 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
