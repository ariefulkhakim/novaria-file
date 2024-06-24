import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware((auth, request) => {
  const { userId } = auth();
  if (!isPublicRoute(request)) {
    auth().protect();
  }
  if (
    (userId && request.nextUrl.pathname === "/sign-in") ||
    (userId && request.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/dashboard/files", request.url));
  }

  if (!userId && request.nextUrl.pathname === "/dashboard(.*") {
    return NextResponse.redirect(new URL("/", request.url));
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
