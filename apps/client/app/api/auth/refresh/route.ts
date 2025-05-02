import { NextRequest } from "next/server";
import { setAuthCookies } from "@/shared/lib/setAuthCookies";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const refreshToken = body.refreshToken;

    if (!refreshToken) {
      return new Response(
        JSON.stringify({ error: "리프레시 토큰이 없습니다." }),
        {
          status: 400,
        }
      );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/refresh`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "리프레시 실패" }), {
        status: res.status,
      });
    }

    const data = await res.json();

    if (!data.accessToken || !data.refreshToken) {
      return new Response(JSON.stringify({ error: "토큰이 없습니다." }), {
        status: 500,
      });
    }

    return setAuthCookies(data.accessToken, data.refreshToken);
  } catch (error) {
    return new Response(JSON.stringify({ error: "서버 오류 발생" }), {
      status: 500,
    });
  }
}
