import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  EQUIPMENT_CATEGORIES,
  FUEL_REQUIRED_CATEGORIES,
  REQUEST_STATUSES,
  type EquipmentCategoryValue
} from "@/lib/constants";
import { formatRequestCode } from "@/lib/format";
import { isUploadedFile, saveUploadedFile, validateUpload, type UploadKind } from "@/lib/files";
import { publicUrl } from "@/lib/url";

export const runtime = "nodejs";

const REQUIRED_FILES: Array<{ field: string; kind: UploadKind }> = [
  { field: "equipmentPhoto", kind: "EQUIPMENT_PHOTO" },
  { field: "defectPhoto", kind: "DEFECT_PHOTO" },
  { field: "warrantyDocument", kind: "WARRANTY_DOCUMENT" }
];

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const errors: string[] = [];
  const shouldReturnJson = wantsJson(request);

  const fullName = getString(formData, "fullName");
  const phone = getString(formData, "phone");
  const whatsapp = getString(formData, "whatsapp");
  const email = optionalString(formData, "email");
  const county = getString(formData, "county");
  const city = getString(formData, "city");
  const street = getString(formData, "street");
  const number = getString(formData, "number");
  const postalCode = optionalString(formData, "postalCode");
  const addressDetails = optionalString(formData, "addressDetails");
  const pickupNotes = optionalString(formData, "pickupNotes");
  const category = getString(formData, "category") as EquipmentCategoryValue;
  const brand = getString(formData, "brand");
  const model = getString(formData, "model");
  const serialNumber = optionalString(formData, "serialNumber");
  const purchaseDate = optionalString(formData, "purchaseDate");
  const purchaseStore = optionalString(formData, "purchaseStore");
  const accessories = optionalString(formData, "accessories");
  const faultDescription = getString(formData, "faultDescription");
  const gdprConsent = formData.get("gdprConsent") === "on";
  const fuelTankEmpty = formData.get("fuelTankEmpty") === "on";

  const requiredStrings = [
    [fullName, "Numele este obligatoriu."],
    [phone, "Telefonul este obligatoriu."],
    [whatsapp, "WhatsApp este obligatoriu."],
    [county, "Județul este obligatoriu."],
    [city, "Orașul este obligatoriu."],
    [street, "Strada este obligatorie."],
    [number, "Numărul adresei este obligatoriu."],
    [brand, "Brandul este obligatoriu."],
    [model, "Modelul este obligatoriu."],
    [faultDescription, "Descrierea defecțiunii este obligatorie."]
  ];

  for (const [value, message] of requiredStrings) {
    if (!value) {
      errors.push(message);
    }
  }

  if (!EQUIPMENT_CATEGORIES.includes(category)) {
    errors.push("Tipul echipamentului nu este valid.");
  }

  if (FUEL_REQUIRED_CATEGORIES.has(category) && !fuelTankEmpty) {
    errors.push("Pentru echipamente pe benzină trebuie confirmat că rezervorul este gol.");
  }

  if (!gdprConsent) {
    errors.push("Consimțământul GDPR este obligatoriu.");
  }

  const uploadedFiles = REQUIRED_FILES.map(({ field, kind }) => {
    const file = formData.get(field);

    if (!isUploadedFile(file)) {
      errors.push("Toate cele trei fișiere sunt obligatorii.");
      return null;
    }

    const uploadError = validateUpload(file, kind);
    if (uploadError) {
      errors.push(uploadError);
    }

    return { kind, file };
  }).filter(Boolean) as Array<{ kind: UploadKind; file: File }>;

  if (errors.length > 0) {
    return errorResponse(errors, shouldReturnJson);
  }

  const now = new Date();
  const year = now.getFullYear();

  const repairRequest = await prisma.$transaction(async (tx) => {
    const latest = await tx.repairRequest.findFirst({
      where: { year },
      orderBy: { sequence: "desc" },
      select: { sequence: true }
    });
    const sequence = (latest?.sequence ?? 0) + 1;
    const publicCode = formatRequestCode(year, sequence);

    const customer = await tx.customer.create({
      data: {
        fullName,
        phone,
        whatsapp,
        email
      }
    });

    const address = await tx.address.create({
      data: {
        county,
        city,
        street,
        number,
        postalCode,
        details: addressDetails,
        pickupNotes
      }
    });

    const equipment = await tx.equipment.create({
      data: {
        category,
        brand,
        model,
        serialNumber,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        purchaseStore,
        accessories,
        fuelTankEmptyConfirmed: FUEL_REQUIRED_CATEGORIES.has(category) ? fuelTankEmpty : false
      }
    });

    const created = await tx.repairRequest.create({
      data: {
        publicCode,
        year,
        sequence,
        status: "NEW",
        faultDescription,
        gdprConsent,
        warrantyDocumentGiven: true,
        customerId: customer.id,
        addressId: address.id,
        equipmentId: equipment.id
      }
    });

    await tx.courierShipment.create({
      data: {
        requestId: created.id
      }
    });

    await tx.statusHistory.create({
      data: {
        requestId: created.id,
        fromStatus: null,
        toStatus: REQUEST_STATUSES[0],
        note: "Cerere creată din formularul public."
      }
    });

    return created;
  });

  const savedFiles = await Promise.all(
    uploadedFiles.map(async ({ kind, file }) => {
      const stored = await saveUploadedFile(file, repairRequest.publicCode, kind);
      return {
        kind,
        ...stored,
        requestId: repairRequest.id
      };
    })
  );

  await prisma.attachment.createMany({
    data: savedFiles
  });

  if (shouldReturnJson) {
    return NextResponse.json({
      id: repairRequest.id,
      publicCode: repairRequest.publicCode
    });
  }

  return NextResponse.redirect(publicUrl(request, `/multumim/${repairRequest.publicCode}`), { status: 303 });
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || null;
}

function wantsJson(request: NextRequest) {
  return request.headers.get("accept")?.includes("application/json") ?? false;
}

function errorResponse(errors: string[], asJson: boolean) {
  if (asJson) {
    return NextResponse.json({ errors: Array.from(new Set(errors)) }, { status: 400 });
  }

  return new NextResponse(
    `Cererea nu a putut fi trimisă:\n\n${Array.from(new Set(errors)).join("\n")}`,
    { status: 400, headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
