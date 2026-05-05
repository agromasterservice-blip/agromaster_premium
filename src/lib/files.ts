import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

export type UploadKind = "EQUIPMENT_PHOTO" | "DEFECT_PHOTO" | "WARRANTY_DOCUMENT";

export function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return typeof value === "object" && value !== null && "arrayBuffer" in value && value.size > 0;
}

export function sanitizeFileName(fileName: string) {
  const ext = path.extname(fileName).toLowerCase();
  const base = path
    .basename(fileName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  return `${base || "file"}${ext}`;
}

export function validateUpload(file: File, kind: UploadKind) {
  if (file.size > MAX_UPLOAD_SIZE) {
    return "Fișierul este prea mare. Limita este 10 MB.";
  }

  if ((kind === "EQUIPMENT_PHOTO" || kind === "DEFECT_PHOTO") && !file.type.startsWith("image/")) {
    return "Fotografiile trebuie să fie imagini.";
  }

  const allowedDocumentTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
  if (kind === "WARRANTY_DOCUMENT" && !allowedDocumentTypes.includes(file.type)) {
    return "Documentul de garanție trebuie să fie PDF sau imagine.";
  }

  return null;
}

export async function saveUploadedFile(file: File, publicCode: string, kind: UploadKind) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", publicCode);
  await mkdir(uploadDir, { recursive: true });

  const safeName = sanitizeFileName(file.name);
  const fileName = `${kind.toLowerCase()}-${randomUUID()}-${safeName}`;
  const diskPath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(diskPath, buffer);

  return {
    fileName,
    originalName: file.name,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    url: `/uploads/${publicCode}/${fileName}`,
    diskPath
  };
}
