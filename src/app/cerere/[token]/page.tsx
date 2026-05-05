import { Wrench } from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  CATEGORY_LABELS,
  STATUS_DESCRIPTIONS,
  STATUS_LABELS,
  type EquipmentCategoryValue,
  type RequestStatus
} from "@/lib/constants";
import { formatShortDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const request = await prisma.repairRequest.findUnique({
    where: { publicCode: decodeURIComponent(token) },
    select: { publicCode: true }
  });
  if (!request) return { title: "Cerere negăsită" };
  return { title: `Status cerere ${request.publicCode} | AGROMASTER SERVICE` };
}

export default async function PublicStatusPage({
  params
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const request = await prisma.repairRequest.findUnique({
    where: { publicCode: decodeURIComponent(token) },
    select: {
      publicCode: true,
      status: true,
      createdAt: true,
      equipment: {
        select: {
          category: true,
          brand: true,
          model: true
        }
      }
    }
  });

  if (!request) {
    notFound();
  }

  const status = request.status as RequestStatus;
  const category = request.equipment.category as EquipmentCategoryValue;

  return (
    <main className="min-h-screen bg-paper px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-xl rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ocean">
            <Wrench className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ocean">
              AGROMASTER SERVICE
            </p>
            <h1 className="mt-0.5 text-xl font-bold text-slate-950">Status cerere</h1>
          </div>
        </div>

        <dl className="mt-5 grid gap-3 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
          <Row label="Număr cerere" value={request.publicCode} />
          <Row label="Status" value={STATUS_LABELS[status]} highlight />
          <Row label="Echipament" value={CATEGORY_LABELS[category]} />
          <Row label="Brand" value={request.equipment.brand} />
          <Row label="Model" value={request.equipment.model} />
          <Row label="Data înregistrării" value={formatShortDate(request.createdAt)} />
        </dl>

        <p className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
          {STATUS_DESCRIPTIONS[status]}
        </p>

        <p className="mt-5 text-xs text-slate-400">
          Pentru întrebări contactați-ne prin WhatsApp sau telefon la numărul afișat pe site.
        </p>
      </section>
    </main>
  );
}

function Row({
  label,
  value,
  highlight = false
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[160px_1fr]">
      <dt className="font-medium text-slate-500">{label}</dt>
      <dd className={highlight ? "font-semibold text-ocean" : "font-semibold text-slate-950"}>
        {value}
      </dd>
    </div>
  );
}
