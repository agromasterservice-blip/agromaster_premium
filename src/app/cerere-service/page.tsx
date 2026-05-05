import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Hash, MessageCircle, Truck, Wrench } from "lucide-react";
import { RepairRequestForm } from "@/components/public/repair-request-form";

export const metadata = {
  title: "Cerere service reparații | AGROMASTER SERVICE",
  description:
    "Trimite cererea de service în 2 minute pentru repararea sculelor și utilajelor de grădină. Primești număr de cerere și link de urmărire status. AGROMASTER SERVICE — București și Ilfov."
};

const quickPoints = [
  { Icon: Clock, text: "Completezi în aproximativ 2 minute" },
  { Icon: Hash, text: "Primești număr de cerere și link de status" },
  { Icon: Truck, text: "Preluare sau trimitere prin curier, după confirmare" },
  { Icon: CheckCircle, text: "Fără cont necesar" }
];

export default function CerereServicePage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-ocean"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Înapoi la pagina principală
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ocean">
              <Wrench className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ocean">
                AGROMASTER SERVICE
              </p>
              <h1 className="text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">
                Cerere de service
              </h1>
            </div>
          </div>
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            Completați formularul pentru a înregistra echipamentul la service. Vă vom contacta
            pentru a confirma datele și a organiza preluarea sau predarea echipamentului.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickPoints.map(({ Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 p-3"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
                <p className="text-xs leading-5 text-slate-700">{text}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-500">
            Preferi să trimiți mai rapid?{" "}
            <Link href="/whatsapp-demo" className="font-medium text-ocean hover:text-ocean-dark">
              Încearcă formularul rapid în stil WhatsApp
            </Link>{" "}
            — durează câteva minute și poți atașa poze direct.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <RepairRequestForm />
      </div>

      <div className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            Ai mai multe echipamente sau reprezentați o firmă?{" "}
            <span className="text-slate-700">
              Puteți trimite o cerere separată pentru fiecare echipament sau ne puteți contacta
              pentru o ofertă personalizată.
            </span>
          </p>
          <div className="mt-3">
            <Link
              href="/whatsapp-demo"
              className="inline-flex items-center gap-2 text-sm font-medium text-ocean hover:text-ocean-dark"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Cerere rapidă prin WhatsApp demo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
