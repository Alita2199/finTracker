import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Use next-auth's JWT helper

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Log the CORS headers for debugging purposes
  console.log('CORS headers set:', {
    'Access-Control-Allow-Origin': 'https://fintrack-master-313loso6j-keshas-projects-2f7b5e82.vercel.app', // Specify the allowed frontend origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  // Set CORS headers
  res.headers.set("Access-Control-Allow-Origin", "https://fintrack-master-313loso6j-keshas-projects-2f7b5e82.vercel.app");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204, // No content
      headers: {
        "Access-Control-Allow-Origin": "https://fintrack-master-313loso6j-keshas-projects-2f7b5e82.vercel.app",
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
