import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    // "/admin-dashboard/:path*",
    "/driver-dashboard/:path*",
    "/agent-dashboard/:path*",
    "/tickets",
    "/profile",
    "/login",
    "/register",
    "/purchase/:path*",
  ],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  console.log("Middleware executed for path:", url.pathname);

  const token = request.cookies.get("api_token")?.value;
  const userRole = request.cookies.get("role")?.value;

  // Public pages (home, tickets, profile) - Allow access to everyone
  if (["/", "/tickets", "/profile"].includes(url.pathname)) {
    return NextResponse.next();
  }

  // Block unauthorized access to /purchase/[id] if user is not signed in
  if (url.pathname.startsWith("/purchase/") && !token) {
    console.log("Unauthorized user trying to access purchase page. Redirecting to /login");
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If no token exists and the user is not already on `/login` or `/register`, redirect to `/login`
  if (!token) {
    if (url.pathname !== "/login" && url.pathname !== "/register") {
      console.log("No token found. Redirecting to /login");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // Allow access to `/login` and `/register`
  }

  // Role-based route protection for dashboards
  if (url.pathname.startsWith("/admin-dashboard") && userRole !== "admin") {
    console.log("Unauthorized access to admin dashboard. Redirecting...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (url.pathname.startsWith("/driver-dashboard") && userRole !== "driver") {
    console.log("Unauthorized access to driver dashboard. Redirecting...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (url.pathname.startsWith("/agent-dashboard") && userRole !== "agent") {
    console.log("Unauthorized access to agent dashboard. Redirecting...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Prevent logged-in users from accessing `/login` or `/register`
  if (url.pathname === "/login" || url.pathname === "/register") {
    console.log("Logged-in user trying to access /login or /register. Redirecting...");
    switch (userRole) {
      case "admin":
        url.pathname = "/admin-dashboard";
        break;
      case "driver":
        url.pathname = "/driver-dashboard";
        break;
      case "agent":
        url.pathname = "/agent-dashboard";
        break;
      default:
        url.pathname = "/";
        break;
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow request to proceed
}
