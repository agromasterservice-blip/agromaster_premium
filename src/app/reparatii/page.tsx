import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  Building2,
  CheckCircle,
  ClipboardList,
  Droplets,
  MessageCircle,
  Package,
  Plug,
  Settings,
  Truck,
  Wrench,
  Zap
} from "lucide-react";

export const metadata = {
  title: "Servicii reparații scule și utilaje | AGROMASTER SERVICE",
  description:
    "Service și reparații pentru aparate de spălat cu presiune, drujbe, motocoase, generatoare, mașini de tuns iarba, pompe și scule electrice în București și Ilfov."
};

const categories = [
  {
    label: "Aparate de spălat cu presiune",
    href: "/reparatii-aparate-spalat-cu-presiune",
    Icon: Droplets,
    desc: "Karcher, Bosch, Nilfisk, Stiga, Greenworks și alte mărci.",
    symptoms: ["nu face presiune", "pierde apă", "nu pornește", "pompa bâzâie"]
  },
  {
    label: "Drujbe",
    href: "/reparatii-drujbe",
    Icon: Settings,
    desc: "Drujbe pe benzină și electrice. Stihl, Husqvarna, Makita și altele.",
    symptoms: ["nu pornește", "se oprește la sarcină", "lanț blocat", "carburator defect"]
  },
  {
    label: "Motocoase",
    href: "/reparatii-motocoase",
    Icon: Wrench,
    desc: "Motocoase pe benzină și electrice, trimere.",
    symptoms: ["nu pornește", "vibrații excesive", "firul nu iese", "capul de tuns blocat"]
  },
  {
    label: "Mașini de tuns iarba",
    href: "/reparatii-masini-tuns-iarba",
    Icon: Wrench,
    desc: "Mașini pe benzină, electrice și pe acumulator.",
    symptoms: ["nu pornește", "lama nu se rotește", "zgomot anormal", "propulsie defectă"]
  },
  {
    label: "Generatoare",
    href: "/reparatii-generatoare",
    Icon: Zap,
    desc: "Generatoare monofazate și trifazate pentru uz casnic și profesional.",
    symptoms: ["nu produce curent", "tensiune instabilă", "se oprește singur", "AVR defect"]
  },
  {
    label: "Pompe",
    href: "/reparatii",
    Icon: Droplets,
    desc: "Pompe de grădină, pompe de suprafață și submersibile.",
    symptoms: ["nu aspiră apă", "debit scăzut", "zgomot anormal", "pierderi de apă"]
  },
  {
    label: "Scule electrice",
    href: "/reparatii-scule-electrice",
    Icon: Plug,
    desc: "Polizoare, șurubelnițe, ferăstraie, percutoare.",
    symptoms: ["nu pornește", "scântei la perii", "miros de ars", "mandrina defectă"]
  },
  {
    label: "Scule pe acumulator",
    href: "/reparatii-scule-electrice",
    Icon: Battery,
    desc: "Bosch, Makita, DeWalt, Milwaukee și altele.",
    symptoms: ["nu se încarcă", "acumulator descărcat rapid", "nu pornește", "eroare baterie"]
  }
];

export default function ReparatiiPage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-ocean"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Înapoi
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-950">
            Servicii de reparații scule și utilaje
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            AGROMASTER SERVICE diagnostichează și repară o gamă largă de echipamente de grădină,
            scule electrice și echipamente de construcții în București și Ilfov. Fiecare cerere este
            înregistrată și urmărită digital.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/cerere-service"
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ocean-dark"
            >
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              Solicită reparație
            </Link>
            <Link
              href="/whatsapp-demo"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Cerere rapidă WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-950">Ce echipamente reparăm</h2>
          <p className="mt-1 text-sm text-slate-500">
            Selectați tipul echipamentului pentru detalii, simptome comune și pași de pregătire.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ label, href, Icon, desc, symptoms }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-5 shadow-soft transition hover:border-ocean/40"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-ocean/10 text-ocean transition group-hover:bg-ocean group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-slate-950">{label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p>
                </div>
                <ul className="flex flex-wrap gap-1">
                  {symptoms.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto flex items-center gap-1 text-xs font-medium text-ocean">
                  Detalii și FAQ <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-950">Cum funcționează procesul de service</h2>
          <ol className="mt-6 space-y-4">
            {[
              "Completezi cererea de service online sau prin WhatsApp demo — durează câteva minute.",
              "Confirmăm datele și te contactăm la numărul indicat pentru a discuta detaliile.",
              "Trimiți echipamentul prin curier sau îl predai direct la service, după confirmare.",
              "Efectuăm diagnosticarea și îți comunicăm costul estimat și soluția înainte de reparație.",
              "Reparăm echipamentul și ți-l returnăm sau îl ridici personal. Statusul este urmărit online."
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-7 text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-base font-bold text-slate-950">Opțiuni de transport echipament</h3>
              <ul className="mt-4 space-y-3">
                {[
                  { Icon: Package, text: "Trimitere prin curier — detalii după confirmare" },
                  { Icon: Truck, text: "Preluare organizată pentru anumite echipamente" },
                  { Icon: ArrowRight, text: "Predare directă la service" }
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-slate-700">
                    <Icon className="h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-slate-200 bg-slate-50 p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 shrink-0 text-ocean" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-bold text-slate-950">Ai mai multe echipamente?</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Lucrăm și cu firme și clienți cu mai multe utilaje. Poți trimite cereri separate
                    sau ne poți contacta pentru o ofertă. În curând: flux dedicat pentru mentenanță.
                  </p>
                  <Link
                    href="/cerere-service"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean hover:text-ocean-dark"
                  >
                    <CheckCircle className="h-4 w-4" aria-hidden="true" />
                    Solicită o ofertă
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
