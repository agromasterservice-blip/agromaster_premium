import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Download,
  MessageCircle,
  PackageCheck,
  Save,
  StickyNote
} from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  ATTACHMENT_LABELS,
  CATEGORY_LABELS,
  FUEL_REQUIRED_CATEGORIES,
  REQUEST_STATUSES,
  STATUS_LABELS,
  type EquipmentCategoryValue,
  type RequestStatus
} from "@/lib/constants";
import { compactAddress, formatDate, formatShortDate, normalizeWhatsappLink } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminRequestDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await requireAdmin();
  const { id } = await params;
  const request = await prisma.repairRequest.findUnique({
    where: { id },
    include: {
      customer: true,
      address: true,
      equipment: true,
      attachments: { orderBy: { uploadedAt: "asc" } },
      courierShipment: true,
      statusHistory: {
        orderBy: { createdAt: "desc" },
        include: { changedBy: true }
      },
      internalNotes: {
        orderBy: { createdAt: "desc" },
        include: { author: true }
      }
    }
  });

  if (!request) {
    notFound();
  }

  const status = request.status as RequestStatus;
  const category = request.equipment.category as EquipmentCategoryValue;
  const whatsappLink = normalizeWhatsappLink(request.customer.whatsapp);
  const pickupAddress = compactAddress([
    request.address.county,
    request.address.city,
    request.address.street,
    request.address.number,
    request.address.details,
    request.address.postalCode
  ]);

  return (
    <main className="min-h-screen bg-paper">
      <AdminHeader email={admin.email} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href="/admin/cereri"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-ocean"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Înapoi la listă
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-950">{request.publicCode}</h1>
              <StatusBadge status={status} />
            </div>
            <p className="mt-1 text-sm text-slate-500">Creată: {formatDate(request.createdAt)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
            ) : null}
            <a
              href={`/api/admin/cereri/${request.id}/export`}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export CSV Gincore
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Panel title="Date client">
              <DetailGrid
                items={[
                  ["Client", request.customer.fullName],
                  ["Telefon", request.customer.phone],
                  ["WhatsApp", request.customer.whatsapp],
                  ["Email", request.customer.email || "-"],
                  ["Adresă ridicare", pickupAddress],
                  ["Observații curier", request.address.pickupNotes || "-"]
                ]}
              />
            </Panel>

            <Panel title="Echipament">
              <DetailGrid
                items={[
                  ["Categorie", CATEGORY_LABELS[category]],
                  ["Brand", request.equipment.brand],
                  ["Model", request.equipment.model],
                  ["Serie", request.equipment.serialNumber || "-"],
                  ["Data achiziției", formatShortDate(request.equipment.purchaseDate)],
                  ["Magazin", request.equipment.purchaseStore || "-"],
                  ["Accesorii", request.equipment.accessories || "-"],
                  [
                    "Rezervor combustibil",
                    FUEL_REQUIRED_CATEGORIES.has(category)
                      ? request.equipment.fuelTankEmptyConfirmed
                        ? "Confirmat gol"
                        : "Neconfirmat"
                      : "Nu se aplică"
                  ]
                ]}
              />
            </Panel>

            <Panel title="Defecțiune">
              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                {request.faultDescription}
              </p>
            </Panel>

            <Panel title="Fișiere încărcate">
              <div className="grid gap-4 md:grid-cols-3">
                {request.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-md border border-slate-200 bg-slate-50 p-3 transition hover:bg-white"
                  >
                    <p className="text-sm font-semibold text-slate-950">
                      {
                        ATTACHMENT_LABELS[
                          attachment.kind as keyof typeof ATTACHMENT_LABELS
                        ]
                      }
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">{attachment.originalName}</p>
                    {attachment.mimeType.startsWith("image/") ? (
                      <Image
                        src={attachment.url}
                        alt={attachment.originalName}
                        width={360}
                        height={220}
                        unoptimized
                        className="mt-3 aspect-video w-full rounded-md object-cover"
                      />
                    ) : (
                      <div className="mt-3 flex aspect-video items-center justify-center rounded-md bg-white text-xs font-semibold text-slate-500">
                        Document
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </Panel>
          </div>

          <aside className="space-y-6">
            <Panel title="Schimbă status">
              <form action={`/api/admin/cereri/${request.id}/status`} method="post" className="space-y-3">
                <div>
                  <label className="label" htmlFor="status">
                    Status
                  </label>
                  <select className="field" id="status" name="status" defaultValue={status}>
                    {REQUEST_STATUSES.map((item) => (
                      <option key={item} value={item}>
                        {STATUS_LABELS[item]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="statusNote">
                    Notă status
                  </label>
                  <textarea className="field min-h-24" id="statusNote" name="note" />
                </div>
                <button className="inline-flex min-h-10 items-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark">
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Salvează status
                </button>
              </form>
            </Panel>

            <Panel title="AWB">
              <form action={`/api/admin/cereri/${request.id}/courier`} method="post" className="space-y-3">
                <div>
                  <label className="label" htmlFor="awbToService">
                    AWB către service
                  </label>
                  <input
                    className="field"
                    id="awbToService"
                    name="awbToService"
                    defaultValue={request.courierShipment?.awbToService ?? ""}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="awbReturn">
                    AWB retur client
                  </label>
                  <input
                    className="field"
                    id="awbReturn"
                    name="awbReturn"
                    defaultValue={request.courierShipment?.awbReturn ?? ""}
                  />
                </div>
                <button className="inline-flex min-h-10 items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
                  <PackageCheck className="h-4 w-4" aria-hidden="true" />
                  Salvează AWB
                </button>
              </form>
            </Panel>

            <Panel title="Notă internă">
              <form action={`/api/admin/cereri/${request.id}/note`} method="post" className="space-y-3">
                <textarea className="field min-h-28" name="body" required />
                <button className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <StickyNote className="h-4 w-4" aria-hidden="true" />
                  Adaugă notă
                </button>
              </form>
              <div className="mt-4 space-y-3">
                {request.internalNotes.map((note) => (
                  <div key={note.id} className="rounded-md bg-slate-50 p-3 text-sm">
                    <p className="whitespace-pre-wrap text-slate-700">{note.body}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {note.author.name} · {formatDate(note.createdAt)}
                    </p>
                  </div>
                ))}
                {request.internalNotes.length === 0 ? (
                  <p className="text-sm text-slate-500">Nu există note interne.</p>
                ) : null}
              </div>
            </Panel>

            <Panel title="Istoric status">
              <div className="space-y-3">
                {request.statusHistory.map((history) => (
                  <div key={history.id} className="rounded-md border border-slate-200 p-3 text-sm">
                    <p className="font-semibold text-slate-950">
                      {STATUS_LABELS[history.toStatus as RequestStatus]}
                    </p>
                    {history.note ? (
                      <p className="mt-1 whitespace-pre-wrap text-slate-600">{history.note}</p>
                    ) : null}
                    <p className="mt-2 text-xs text-slate-500">
                      {history.changedBy?.name || "Sistem"} · {formatDate(history.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="section-title">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DetailGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <dl className="grid gap-3 text-sm">
      {items.map(([label, value]) => (
        <div key={label} className="grid gap-1 sm:grid-cols-[170px_1fr]">
          <dt className="font-medium text-slate-500">{label}</dt>
          <dd className="text-slate-900">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
