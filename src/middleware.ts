import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/admin-dashboard/:path*", // Protect admin routes
    "/profile",                // Protect profile page
    "/login",                  // Protect login page
    "/register",               // Protect registration page
  ],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  console.log("Middleware executed for path:", url.pathname);

  const token = request.cookies.get("api_token")?.value;

  // Check if token exists
  if (!token) {
    console.log("No token found.");
  }

  const isAdmin = request.cookies.get("is_admin")?.value === "true";

  // Protect /admin-dashboard
  if (url.pathname.startsWith("/admin-dashboard")) {
    if (!token) {
      console.log("Unauthenticated user. Redirecting to /login");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    if (!isAdmin) {
      console.log("Non-admin user. Redirecting to /404");
      url.pathname = "/404";
      return NextResponse.redirect(url);
    }
  }

  // Protect /profile
  if (url.pathname === "/profile") {
    if (!token) {
      console.log("Unauthenticated user. Redirecting to /login");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Prevent logged-in users from accessing /login or /register
  if (url.pathname === "/login" || url.pathname === "/register") {
    if (token) {
      url.pathname = isAdmin ? "/admin-dashboard" : "/tickets";
      console.log("Logged-in user. Redirecting to:", url.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
