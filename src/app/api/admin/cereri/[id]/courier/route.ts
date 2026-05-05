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
  const awbToService = optionalString(formData.get("awbToService"));
  const awbReturn = optionalString(formData.get("awbReturn"));

  await prisma.courierShipment.upsert({
    where: { requestId: id },
    create: {
      requestId: id,
      awbToService,
      awbReturn
    },
    update: {
      awbToService,
      awbReturn
    }
  });

  return NextResponse.redirect(publicUrl(request, `/admin/cereri/${id}`), 303);
}

function optionalString(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
