import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // Read token from cookies (make sure you set token in cookies at login)
  const token = req.cookies.get("token")?.value

  // Protect all /dashboard/* routes
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirect to /login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
}
