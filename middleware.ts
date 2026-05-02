// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/contents",
  "/analytics",
  "/settings",
  "/my-settings",
]

const authRoutes = [
  "/login",
  "/register",
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isLogged = request.cookies.get("is_logged")?.value === "true"
  const authEmail = request.cookies.get("auth_email")?.value

  const isAuthenticated = isLogged && Boolean(authEmail)

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login")

    loginUrl.searchParams.set("callbackUrl", pathname)

    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard"))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/contents/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/my-settings/:path*",
    "/login",
    "/register",
  ],
}
