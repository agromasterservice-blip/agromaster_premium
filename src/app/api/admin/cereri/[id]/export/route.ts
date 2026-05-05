import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { buildCsv } from "@/lib/csv";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  type EquipmentCategoryValue,
  type RequestStatus
} from "@/lib/constants";
import { compactAddress, formatDate, formatShortDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { publicUrl } from "@/lib/url";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentUser();
  const { id } = await params;

  if (!admin) {
    return NextResponse.redirect(publicUrl(request, "/admin/login"), 303);
  }

  const repairRequest = await prisma.repairRequest.findUnique({
    where: { id },
    include: {
      customer: true,
      address: true,
      equipment: true,
      attachments: true,
      courierShipment: true
    }
  });

  if (!repairRequest) {
    return new NextResponse("Not found", { status: 404 });
  }

  const category = repairRequest.equipment.category as EquipmentCategoryValue;
  const headers = [
    "Număr cerere",
    "Data cerere",
    "Status",
    "Client",
    "Telefon",
    "WhatsApp",
    "Email",
    "Adresă ridicare",
    "Categorie",
    "Brand",
    "Model",
    "Serie",
    "Data achiziției",
    "Magazin",
    "Defecțiune",
    "Diagnostic gratuit",
    "Transport plătit de companie",
    "Rezervor combustibil gol",
    "AWB către service",
    "AWB retur client",
    "Fișiere"
  ];

  const row = [
    repairRequest.publicCode,
    formatDate(repairRequest.createdAt),
    STATUS_LABELS[repairRequest.status as RequestStatus],
    repairRequest.customer.fullName,
    repairRequest.customer.phone,
    repairRequest.customer.whatsapp,
    repairRequest.customer.email,
    compactAddress([
      repairRequest.address.county,
      repairRequest.address.city,
      repairRequest.address.street,
      repairRequest.address.number,
      repairRequest.address.details,
      repairRequest.address.postalCode
    ]),
    CATEGORY_LABELS[category],
    repairRequest.equipment.brand,
    repairRequest.equipment.model,
    repairRequest.equipment.serialNumber,
    formatShortDate(repairRequest.equipment.purchaseDate),
    repairRequest.equipment.purchaseStore,
    repairRequest.faultDescription,
    repairRequest.diagnosisFree ? "Da" : "Nu",
    repairRequest.shippingPaidByCompany ? "Da" : "Nu",
    repairRequest.equipment.fuelTankEmptyConfirmed ? "Da" : "Nu se aplică / Nu",
    repairRequest.courierShipment?.awbToService,
    repairRequest.courierShipment?.awbReturn,
    repairRequest.attachments.map((attachment) => attachment.url).join(" ")
  ];

  const csv = buildCsv(headers, [row]);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${repairRequest.publicCode}-gincore.csv"`
    }
  });
}
