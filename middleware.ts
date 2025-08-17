import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// possible names of COOKIES in Auth.js / NextAuth
const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token", // just to if it maybe exist
  "__Secure-next-auth.session-token",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // what routes we should protect for example now
  const protectedPaths = ["/dashboard", "/account", "/orders"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  // The "at least there is a session cookie" flag
  const hasSession = SESSION_COOKIES.some((name) => req.cookies.has(name));

  if (isProtected && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

//what we protect if user not logged in
export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/orders/:path*"],
};
