import { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getNewAccessToken } from "./service/refreshToken";
import { jwtUtils } from "./utils/jwt";
import { cookies } from "next/headers";

const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const PUBLIC_ROUTES = ["/", "/properties"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;


     const cookieStore = await cookies();

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken ? await jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string ) : null;

  const decodedRefreshToken = refreshToken? await jwtUtils.verifyToken(   refreshToken,   process.env.JWT_REFRESH_SECRET as string  ): null;



  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;

      decodedAccessToken = await jwtUtils.verifyToken( newAccessToken,  process.env.JWT_ACCESS_SECRET as string);
    }
  }

  let userRole  = null;

   if(decodedAccessToken?.success && decodedAccessToken.data){
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }


  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/dashboard/landlord", request.url));
    }

    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  }



  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    if(!accessToken && !isPublicRoute && !isAuthRoute){
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

  if (pathname.startsWith("/dashboard/landlord") && userRole !== "LANDLORD") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
