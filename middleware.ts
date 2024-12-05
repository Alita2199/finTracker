import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Use next-auth's JWT helper

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // CORS headers for all API responses
  res.headers.set("Access-Control-Allow-Origin", "*"); // Update this to match your frontend domain
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204, // No content
      headers: {
        "Access-Control-Allow-Origin": "*", // Update this to your domain
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // JWT Authentication check
  const token = getToken({ req });

  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return res; // Continue with the request if authenticated
}

// Specify which routes to apply this middleware to
export const config = {
  matcher: [
    "/dashboard",
    "/account",
    "/income",
    "/expense",
    "/transfer",
    "/saving",
    "/category",
  ],
};
