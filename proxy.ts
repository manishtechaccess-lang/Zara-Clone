import { NextResponse, NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const ADMIN_ROUTES = ["/admin"];
  const PRIVATE_ROUTES = [
    "/api/cart",
    "/cart",
    "/account",
    "/orders",
    "wishlist",
  ];
  const PUBLIC_ROUTES = ["/auth/Login", "/auth/Signup"];

  const token = request.cookies.get("token")?.value || "";
  const isPrivateRoute = PRIVATE_ROUTES.some((route) => path.startsWith(route));
  const isPublicRoute = PUBLIC_ROUTES.some((route) => path.startsWith(route));

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("auth/Login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/Login",
    "/auth/Signup",
    "/cart",
    "/api/cart",
    "/cart/:path*",
    "/account/:path*",
    "/wishlist/:path*",
    "/orders/:path*",
    "/admin/:path*",
  ],
};
