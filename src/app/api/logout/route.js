import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json({
    message: "Logged out !!",
    success: true,
  });

  response.cookies.set("authToken", "", {
    path: '/',  // Ensure the cookie is cleared for the entire site
    expires: new Date(0),
  });

  return response;
}
