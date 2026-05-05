import Link from "next/link";
import { LogOut, Wrench } from "lucide-react";

export function AdminHeader({ email }: { email: string }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/admin/cereri" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean">
            <Wrench className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
          <span>
            <span className="block text-sm font-bold text-slate-950">AGROMASTER SERVICE</span>
            <span className="block text-xs text-slate-500">Admin reparații</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-slate-500 sm:inline">{email}</span>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Ieșire
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
