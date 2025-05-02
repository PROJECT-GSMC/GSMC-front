import { NextRequest, NextResponse } from "next/server";

const Protected = [
  "/major",
  "/humanity",
  "/foreign",
  "/detail",
  "/example",
  "/posts",
  "/calculate",
  "/book",
];
const allAllowed = ["/", "/signup", "/signin"];

function isProtectedRoute(path: string): boolean {
  return Protected.some((route) => path.startsWith(route));
}

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAllowed = allAllowed.includes(pathname);

  const token = request.cookies.get("accessToken")?.value || null;
  const refreshToken = request.cookies.get("refreshToken")?.value || null;

  if (isProtectedRoute(pathname)) {
    if (!token && refreshToken) {
      const res = await refreshAccessToken(refreshToken);
      if (res) {
        const response = NextResponse.next();
        response.cookies.set("accessToken", res.accessToken, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24,
        });
        response.cookies.set("refreshToken", res.refreshToken, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        });
        return response;
      }
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (token && isAllowed) {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/major",
    "/humanity",
    "/foreign",
    "/detail",
    "/example",
    "/posts",
    "/calculate",
    "/book",
  ],
};
