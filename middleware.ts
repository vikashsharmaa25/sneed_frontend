import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value

  const isAuthPage = pathname === "/login" || pathname === "/signup"
  const isDashboard = pathname.startsWith("/dashboard")

  // Handle root: send to dashboard if authenticated, else to login
  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = token ? "/dashboard" : "/login"
    return NextResponse.redirect(url)
  }

  // Block protected routes without a token
  if (isDashboard && !token) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // Prevent visiting auth pages when already authenticated
  if (isAuthPage && token) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
}
