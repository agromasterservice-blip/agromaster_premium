import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { REQUEST_STATUSES, type RequestStatus } from "@/lib/constants";
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
  const nextStatus = String(formData.get("status") ?? "") as RequestStatus;
  const note = optionalString(formData.get("note"));

  if (!REQUEST_STATUSES.includes(nextStatus)) {
    return NextResponse.redirect(publicUrl(request, `/admin/cereri/${id}`), 303);
  }

  const existing = await prisma.repairRequest.findUnique({
    where: { id },
    select: { status: true }
  });

  if (!existing) {
    return NextResponse.redirect(publicUrl(request, "/admin/cereri"), 303);
  }

  await prisma.$transaction([
    prisma.repairRequest.update({
      where: { id },
      data: { status: nextStatus }
    }),
    prisma.statusHistory.create({
      data: {
        requestId: id,
        fromStatus: existing.status,
        toStatus: nextStatus,
        changedById: admin.id,
        note
      }
    })
  ]);

  return NextResponse.redirect(publicUrl(request, `/admin/cereri/${id}`), 303);
}

function optionalString(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
