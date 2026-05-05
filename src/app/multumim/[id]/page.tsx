import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipboardList, Home, MessageCircle, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CATEGORY_LABELS, STATUS_LABELS, type EquipmentCategoryValue, type RequestStatus } from "@/lib/constants";
import { compactAddress, formatDate, normalizeWhatsappLink } from "@/lib/format";
import { CopyLinkButton } from "@/components/public/copy-link-button";

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await prisma.repairRequest.findUnique({
    where: { publicCode: decodeURIComponent(id) },
    include: {
      customer: true,
      address: true,
      equipment: true
    }
  });

  if (!request) {
    notFound();
  }

  const whatsappLink = normalizeWhatsappLink(request.customer.whatsapp);
  const statusUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/cerere/${encodeURIComponent(request.publicCode)}`;

  return (
    <main className="min-h-screen bg-paper px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ocean">
            <Wrench className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ocean">
              AGROMASTER SERVICE
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950">Cererea a fost trimisă</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Am primit cererea de service. Un operator va verifica datele și vă va contacta
              pentru a confirma preluarea sau predarea echipamentului.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
          <InfoRow label="Număr cerere" value={request.publicCode} />
          <InfoRow label="Data trimiterii" value={formatDate(request.createdAt)} />
          <InfoRow label="Status" value={STATUS_LABELS[request.status as RequestStatus]} />
          <InfoRow
            label="Echipament"
            value={`${CATEGORY_LABELS[request.equipment.category as EquipmentCategoryValue]} - ${request.equipment.brand} ${request.equipment.model}`}
          />
          <InfoRow
            label="Adresă ridicare"
            value={compactAddress([
              request.address.county,
              request.address.city,
              request.address.street,
              request.address.number
            ])}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/cerere/${encodeURIComponent(request.publicCode)}`}
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark"
          >
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            Verifică statusul cererii
          </Link>
          <CopyLinkButton url={statusUrl} />
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Pagina principală
          </Link>
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Deschide WhatsApp
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[160px_1fr]">
      <dt className="font-medium text-slate-500">{label}</dt>
      <dd className="font-semibold text-slate-950">{value}</dd>
    </div>
  );
}
