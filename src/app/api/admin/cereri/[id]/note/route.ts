import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { publicUrl } from "@/lib/url";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentUser();
  const { id } = await params;

  if (!admin) {
    return NextResponse.redirect(publicUrl(request, "/admin/login"), 303);
  }

  const formData = await request.formData();
  const body = String(formData.get("body") ?? "").trim();

  if (body) {
    await prisma.internalNote.create({
      data: {
        body,
        requestId: id,
        authorId: admin.id
      }
    });
  }

  return NextResponse.redirect(publicUrl(request, `/admin/cereri/${id}`), 303);
}
