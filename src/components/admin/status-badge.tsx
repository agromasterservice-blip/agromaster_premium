import { STATUS_LABELS, type RequestStatus } from "@/lib/constants";

const STATUS_STYLES: Record<RequestStatus, string> = {
  NEW: "bg-blue-50 text-blue-700 ring-blue-200",
  NEEDS_REVIEW: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  MISSING_INFO: "bg-amber-50 text-amber-800 ring-amber-200",
  READY_FOR_PICKUP: "bg-teal-50 text-teal-700 ring-teal-200",
  AWB_PREPARED: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  PICKUP_SCHEDULED: "bg-sky-50 text-sky-700 ring-sky-200",
  RECEIVED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  DIAGNOSIS: "bg-purple-50 text-purple-700 ring-purple-200",
  WARRANTY_CHECK: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
  IN_REPAIR: "bg-orange-50 text-orange-800 ring-orange-200",
  WAITING_PARTS: "bg-yellow-50 text-yellow-800 ring-yellow-200",
  REPAIRED: "bg-lime-50 text-lime-800 ring-lime-200",
  RETURN_SHIPPING: "bg-slate-100 text-slate-700 ring-slate-200",
  CLOSED: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  CANCELLED: "bg-red-50 text-red-700 ring-red-200"
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
