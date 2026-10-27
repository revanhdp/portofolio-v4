import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, parseToken } from "@/lib/auth";

/* First gate for /admin. It only checks the cookie signature; pages, route
   handlers and server actions look the user up and check the role again. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();

  if (!parseToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
