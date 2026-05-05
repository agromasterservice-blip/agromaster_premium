import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { publicUrl } from "@/lib/url";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(publicUrl(request, "/admin/login"), 303);
  response.cookies.delete(SESSION_COOKIE);

  return response;
}
