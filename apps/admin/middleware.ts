import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOGIN_PATH = "/login";

const PROTECTED_ROUTES = ["/", "/check-post", "/score"];

interface JWTPayload {
  exp?: number;
  [key: string]: unknown;
}

function decodeJWT(token: string): { payload: JWTPayload | null; isValid: boolean } {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return { payload: null, isValid: false };
    }

    const base64Url = parts[1];
    if (!base64Url) {
      return { payload: null, isValid: false };
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));

    if (payload.role === "ROLE_STUDENT") {
      return { payload: null, isValid: false };
    } else {
      return { payload, isValid: true };
    }
  } catch (error) {
    console.error(error);
    return { payload: null, isValid: false };
  }
}

function isValidToken(accessToken: string | null): boolean {
  if (!accessToken) return false;

  try {
    const { payload, isValid } = decodeJWT(accessToken);

    if (!isValid || !payload) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function isProtectedRoute(path: string): boolean {
  if (PROTECTED_ROUTES.includes(path)) {
    return true;
  }

  return PROTECTED_ROUTES.some((route) => route !== "/" && path.startsWith(route));
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === LOGIN_PATH;

  const token = request.cookies.get("accessToken")?.value || null;
  const isTokenValid = isValidToken(token);

  if (pathname === "/" && !isTokenValid) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (isProtectedRoute(pathname) && !isTokenValid) {
    const redirectUrl = new URL(LOGIN_PATH, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isTokenValid && isLoginPage) {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/check-post",
    "/score",
    "/dashboard/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/products/:path*",
  ],
};
