import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isArPath = pathname.startsWith("/ar");
  const isEnPath = pathname.startsWith("/en");
  const userId = request.cookies.get("userId")?.value;

  const basePath = isArPath ? "/ar" : isEnPath ? "/en" : "";

  if (pathname.startsWith(`${basePath}/login`) && userId) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }
  if (pathname.startsWith(`${basePath}/checkout`) && !userId) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (pathname.startsWith(`${basePath}/my-account`) && !userId) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }
}
export const config = {
  matcher: [
    "/ar/my-account/:path*",
    "/my-account/:path*",
    "/ar/checkout/:path*",
    "/checkout/:path*",
    "/ar/login",
    "/login",
  ],
};
