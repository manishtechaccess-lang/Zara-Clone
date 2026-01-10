import { publicDecrypt } from "crypto";
import { NextResponse, NextRequest } from "next/server";

export const proxy = (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  const ADMIN_ROUTES = ["/admin"];

  const PRIVATE_ROUTES = [
    "/cart",
    "/checkout",
    "/account",
    "/orders",
    "wishlist",
  ];

  //   const PUBLIC_ROUTES = ["/", "/product", "/Login", "/Signup"];
  const token = request.cookies.get("token")?.value || "";
  const isPrivateRoute = PRIVATE_ROUTES.some((route) => path.startsWith(route));

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/Signup", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/account/:path*",
    "/wishlist/:path*",
    "/admin/:path*",
  ],
};
