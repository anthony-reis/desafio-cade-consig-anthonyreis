import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";
import { DecodedToken } from "./lib/types/decodedToken";

const publicRoutes = [
  { path: "/sign-in", whenAuthenticated: "redirect" },
  { path: "/upload", whenAuthenticated: "next" },
  { path: "", whenAuthenticated: "next" },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICADED_ROUTE = "/sign-in";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken && publicRoute) {
    return NextResponse.next();
  }

  if (!accessToken && !publicRoute) {
    const signInUrl = new URL(
      REDIRECT_WHEN_NOT_AUTHENTICADED_ROUTE,
      request.url
    );
    return NextResponse.redirect(signInUrl);
  }

  if (
    accessToken &&
    publicRoute &&
    publicRoute?.whenAuthenticated === "redirect"
  ) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (accessToken && !publicRoute) {
    try {
      const decoded = jwtDecode<DecodedToken>(accessToken);

      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        const response = NextResponse.redirect(
          new URL(REDIRECT_WHEN_NOT_AUTHENTICADED_ROUTE, request.url)
        );
        response.cookies.delete("accessToken");
        return response;
      }

      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICADED_ROUTE, request.url)
      );
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
