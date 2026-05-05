import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { publicUrl } from "@/lib/url";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = await prisma.user.findFirst({
    where: {
      email,
      active: true,
      role: "ADMIN"
    }
  });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.redirect(publicUrl(request, "/admin/login?error=1"), 303);
  }

  const response = NextResponse.redirect(publicUrl(request, "/admin/cereri"), 303);
  response.cookies.set(SESSION_COOKIE, createSessionToken(user.id), sessionCookieOptions);

  return response;
}
