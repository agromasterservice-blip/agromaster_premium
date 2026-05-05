export const REQUEST_STATUSES = [
  "NEW",
  "NEEDS_REVIEW",
  "MISSING_INFO",
  "READY_FOR_PICKUP",
  "AWB_PREPARED",
  "PICKUP_SCHEDULED",
  "RECEIVED",
  "DIAGNOSIS",
  "WARRANTY_CHECK",
  "IN_REPAIR",
  "WAITING_PARTS",
  "REPAIRED",
  "RETURN_SHIPPING",
  "CLOSED",
  "CANCELLED"
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const STATUS_LABELS: Record<RequestStatus, string> = {
  NEW: "Nouă",
  NEEDS_REVIEW: "În verificare",
  MISSING_INFO: "Lipsesc informații",
  READY_FOR_PICKUP: "Gata pentru ridicare",
  AWB_PREPARED: "AWB pregătit",
  PICKUP_SCHEDULED: "Curier programat",
  RECEIVED: "Primită în service",
  DIAGNOSIS: "Diagnosticare",
  WARRANTY_CHECK: "Verificare garanție",
  IN_REPAIR: "În reparație",
  WAITING_PARTS: "Așteaptă piese",
  REPAIRED: "Reparată",
  RETURN_SHIPPING: "Retur către client",
  CLOSED: "Închisă",
  CANCELLED: "Anulată"
};

export const EQUIPMENT_CATEGORIES = [
  "PRESSURE_WASHER",
  "CHAINSAW",
  "BRUSHCUTTER",
  "GENERATOR",
  "LAWN_MOWER",
  "PUMP",
  "POWER_TOOL"
] as const;

export type EquipmentCategoryValue = (typeof EQUIPMENT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<EquipmentCategoryValue, string> = {
  PRESSURE_WASHER: "Aparat de spălat cu presiune",
  CHAINSAW: "Drujbă",
  BRUSHCUTTER: "Motocoasă",
  GENERATOR: "Generator",
  LAWN_MOWER: "Mașină de tuns iarba",
  PUMP: "Pompă",
  POWER_TOOL: "Sculă electrică / pe acumulator"
};

export const FUEL_REQUIRED_CATEGORIES = new Set<EquipmentCategoryValue>([
  "CHAINSAW",
  "BRUSHCUTTER",
  "GENERATOR",
  "LAWN_MOWER"
]);

export const STATUS_DESCRIPTIONS: Record<RequestStatus, string> = {
  NEW: "Cererea a fost primită și urmează să fie verificată de un operator.",
  NEEDS_REVIEW: "Operatorul analizează datele transmise.",
  MISSING_INFO: "Sunt necesare informații suplimentare. Veți fi contactat în curând.",
  READY_FOR_PICKUP: "Produsul este pregătit pentru a fi preluat de curier.",
  AWB_PREPARED: "Documentele pentru curier au fost generate.",
  PICKUP_SCHEDULED: "Curierul a fost programat pentru preluarea produsului.",
  RECEIVED: "Produsul a ajuns la service și va fi preluat spre diagnosticare.",
  DIAGNOSIS: "Tehnicianul diagnostichează defecțiunea produsului.",
  WARRANTY_CHECK: "Se verifică condițiile de garanție.",
  IN_REPAIR: "Produsul este în curs de reparație.",
  WAITING_PARTS: "Se așteaptă piesele de schimb necesare.",
  REPAIRED: "Reparația a fost finalizată. Produsul va fi returnat în curând.",
  RETURN_SHIPPING: "Produsul a fost expediat și se îndreaptă spre dumneavoastră.",
  CLOSED: "Cererea a fost închisă. Mulțumim că ați ales AGROMASTER SERVICE.",
  CANCELLED: "Cererea a fost anulată."
};

export const ATTACHMENT_LABELS = {
  EQUIPMENT_PHOTO: "Foto echipament",
  DEFECT_PHOTO: "Foto defect",
  WARRANTY_DOCUMENT: "Document achiziție / garanție"
} as const;
