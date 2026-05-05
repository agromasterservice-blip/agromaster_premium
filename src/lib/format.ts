export function formatRequestCode(year: number, sequence: number) {
  return `SPS-${year}-${String(sequence).padStart(6, "0")}`;
}

export function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function formatShortDate(value?: Date | string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "medium"
  }).format(new Date(value));
}

export function compactAddress(parts: Array<string | null | undefined>) {
  return parts
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");
}

export function normalizeWhatsappLink(phone: string) {
  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0")) {
    digits = `40${digits.slice(1)}`;
  }

  if (!digits) {
    return null;
  }

  return `https://wa.me/${digits}`;
}
