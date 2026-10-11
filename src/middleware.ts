import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(req: NextRequest) {
  const session = getSessionCookie(req);
  const path = req.nextUrl.pathname;

  const isProtected =
    path.startsWith("/product/") || path.startsWith("/profile");

  if (isProtected && !session) {
    const url = new URL("/signin", req.url);
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/profile/:path*", "/product", "/product/:path*"],
};
