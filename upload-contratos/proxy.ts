import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session/session";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
}

const publicPaths = ["/sign-in"];
const REDIRECT_WHEN_NOT_AUTHENTICATED = "/sign-in";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = publicPaths.includes(path);

  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions
  );

  const isLoggedIn = session.isLoggedIn && session.accessToken;

  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED, request.url)
    );
  }

  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isLoggedIn) {
    try {
      const decoded = jwtDecode<DecodedToken>(session.accessToken!);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        session.destroy();
        return NextResponse.redirect(
          new URL(REDIRECT_WHEN_NOT_AUTHENTICATED, request.url)
        );
      }
    } catch (error) {
      session.destroy();
      return NextResponse.redirect(
        new URL(REDIRECT_WHEN_NOT_AUTHENTICATED, request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
