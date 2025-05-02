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
  if (Protected.includes(path)) {
    return true;
  }
  return Protected.some((route) => path.startsWith(route));
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAllowed = allAllowed.includes(pathname);

  const token = request.cookies.get("accessToken")?.value || null;
  const isTokenValid = Boolean(token);

  if (isProtectedRoute(pathname) && !isTokenValid) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isTokenValid && isAllowed) {
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
