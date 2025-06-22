import { NextRequest, NextResponse } from "next/server";

const ProtectedRoutes = ["/check-post", "/score", "/"];
const PublicRoutes = new Set(["/signin", "/signup"]);

function isProtectedRoute(path: string): boolean {
  return ProtectedRoutes.some((route) => path.startsWith(route));
}

function isPublicRoute(path: string): boolean {
  return PublicRoutes.has(path);
}

async function refreshAccessToken(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const response = await fetch(
      `${process.env["NEXT_PUBLIC_API_URL"]}/auth/refresh`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) return null;

    const data = (await response.json()) as {
      accessToken: string;
      refreshToken: string;
    };
    return data;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("accessToken")?.value ?? null;
  const refreshToken = request.cookies.get("refreshToken")?.value ?? null;

  if (isProtectedRoute(pathname) && token === null) {
    if (refreshToken !== null) {
      const res = await refreshAccessToken(refreshToken);
      if (res === null) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
      const { accessToken, refreshToken: newRefreshToken } = res as {
        accessToken: string;
        refreshToken: string;
      };
      const response = NextResponse.next();
      response.cookies.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });
      response.cookies.set("refreshToken", newRefreshToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }

    if (!isPublicRoute(pathname)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (token !== null && isPublicRoute(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/check-post/:path*", "/score/:path*", "/", "/signin", "/signup"],
};
