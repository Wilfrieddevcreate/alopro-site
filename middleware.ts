import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "alopro_admin_session";
const SESSION_TOKEN = process.env.SESSION_SECRET || "authenticated_alopro_admin_2026";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes (except login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get(SESSION_COOKIE)?.value;
    if (session !== SESSION_TOKEN) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login")) {
    const session = request.cookies.get(SESSION_COOKIE)?.value;
    if (session !== SESSION_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
