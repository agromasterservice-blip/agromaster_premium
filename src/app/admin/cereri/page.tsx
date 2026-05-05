import Link from "next/link";
import { Prisma } from "@prisma/client";
import { FileText, Search } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  CATEGORY_LABELS,
  REQUEST_STATUSES,
  STATUS_LABELS,
  type EquipmentCategoryValue,
  type RequestStatus
} from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function AdminRequestsPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const admin = await requireAdmin();
  const params = await searchParams;
  const q = single(params.q).trim();
  const rawStatus = single(params.status);
  const status = REQUEST_STATUSES.includes(rawStatus as RequestStatus)
    ? (rawStatus as RequestStatus)
    : "";

  const where: Prisma.RepairRequestWhereInput = {};

  if (status) {
    where.status = status;
  }

  if (q) {
    where.OR = [
      { publicCode: { contains: q } },
      { customer: { fullName: { contains: q } } },
      { customer: { phone: { contains: q } } },
      { customer: { whatsapp: { contains: q } } },
      { equipment: { brand: { contains: q } } },
      { equipment: { model: { contains: q } } },
      { equipment: { serialNumber: { contains: q } } },
      { faultDescription: { contains: q } }
    ];
  }

  const requests = await prisma.repairRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      equipment: true,
      courierShipment: true
    },
    take: 100
  });

  return (
    <main className="min-h-screen bg-paper">
      <AdminHeader email={admin.email} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ocean">
              Admin
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950">Cereri reparații</h1>
          </div>
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Formular client
          </Link>
        </div>

        <form className="mt-6 grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-soft md:grid-cols-[1fr_240px_auto]">
          <div>
            <label className="label" htmlFor="q">
              Căutare
            </label>
            <input
              className="field"
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Număr cerere, client, telefon, model, serie"
            />
          </div>
          <div>
            <label className="label" htmlFor="status">
              Status
            </label>
            <select className="field" id="status" name="status" defaultValue={status}>
              <option value="">Toate statusurile</option>
              {REQUEST_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {STATUS_LABELS[item]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex min-h-10 items-center justify-center gap-2 self-end rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Filtrează
          </button>
        </form>

        <section className="mt-6 overflow-hidden rounded-md border border-slate-200 bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Cerere</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Echipament</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">AWB</th>
                  <th className="px-4 py-3">Creată</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link className="font-semibold text-ocean hover:underline" href={`/admin/cereri/${request.id}`}>
                        {request.publicCode}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-950">{request.customer.fullName}</div>
                      <div className="text-xs text-slate-500">{request.customer.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-950">
                        {request.equipment.brand} {request.equipment.model}
                      </div>
                      <div className="text-xs text-slate-500">
                        {
                          CATEGORY_LABELS[
                            request.equipment.category as EquipmentCategoryValue
                          ]
                        }
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={request.status as RequestStatus} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      <div>Tur: {request.courierShipment?.awbToService || "-"}</div>
                      <div>Retur: {request.courierShipment?.awbReturn || "-"}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(request.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {requests.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-slate-500">
              Nu există cereri pentru filtrele selectate.
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
