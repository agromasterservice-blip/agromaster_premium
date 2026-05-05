import Image from "next/image";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/admin/cereri");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-4 py-8">
      <section className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <Image
            src="/start-pro-service-logo.png"
            alt="START PRO SERVICE"
            width={48}
            height={48}
            className="rounded-full"
            priority
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ocean">
              START PRO SERVICE
            </p>
            <h1 className="text-xl font-bold text-slate-950">Autentificare admin</h1>
          </div>
        </div>

        {params.error ? (
          <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Email sau parolă incorectă.
          </p>
        ) : null}

        <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="field" id="email" name="email" type="email" required />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Parolă
            </label>
            <input className="field" id="password" name="password" type="password" required />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark"
          >
            Intră în admin
          </button>
        </form>
      </section>
    </main>
  );
}
