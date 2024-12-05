import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Use next-auth's JWT helper

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const allowedOrigin = "https://fintrack-master-313loso6j-keshas-projects-2f7b5e82.vercel.app";

  // Log headers for debugging
  console.log('Request headers:', req.headers);
  console.log('CORS headers set:', {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  res.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight (OPTIONS) request
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204, // No content
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const token = getToken({ req });
  if (!token) {
    console.log('Unauthorized request');
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return res; // Continue if authenticated
}

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
