import Link from "next/link";
import {
  ArrowRight,
  Battery,
  Building2,
  CheckCircle,
  ClipboardList,
  Clock,
  Droplets,
  Hash,
  Link2,
  MapPin,
  MessageCircle,
  Package,
  Plug,
  Settings,
  ShieldCheck,
  Smartphone,
  Truck,
  Wrench,
  Zap
} from "lucide-react";

export const metadata = {
  title: "AGROMASTER SERVICE | Reparații scule și utilaje de grădină București",
  description:
    "Service și reparații pentru aparate de spălat cu presiune, drujbe, motocoase, generatoare, mașini de tuns iarba și scule electrice în București și Ilfov. Trimite cererea online în 2 minute."
};

const serviceCategories = [
  {
    label: "Aparate de spălat cu presiune",
    href: "/reparatii-aparate-spalat-cu-presiune",
    Icon: Droplets,
    symptoms: ["nu face presiune", "pierde apă", "nu pornește"]
  },
  {
    label: "Drujbe",
    href: "/reparatii-drujbe",
    Icon: Settings,
    symptoms: ["nu pornește", "se oprește la sarcină", "lanț blocat"]
  },
  {
    label: "Motocoase",
    href: "/reparatii-motocoase",
    Icon: Wrench,
    symptoms: ["nu pornește", "vibrații excesive", "firul nu iese"]
  },
  {
    label: "Mașini de tuns iarba",
    href: "/reparatii-masini-tuns-iarba",
    Icon: Wrench,
    symptoms: ["nu pornește", "lama nu se rotește", "zgomot anormal"]
  },
  {
    label: "Generatoare",
    href: "/reparatii-generatoare",
    Icon: Zap,
    symptoms: ["nu produce curent", "tensiune instabilă", "se oprește singur"]
  },
  {
    label: "Pompe",
    href: "/reparatii",
    Icon: Droplets,
    symptoms: ["nu aspiră apă", "debit scăzut", "zgomot"]
  },
  {
    label: "Scule electrice",
    href: "/reparatii-scule-electrice",
    Icon: Plug,
    symptoms: ["nu pornește", "scântei", "miros de ars"]
  },
  {
    label: "Scule pe acumulator",
    href: "/reparatii-scule-electrice",
    Icon: Battery,
    symptoms: ["nu se încarcă", "acumulator descărcat rapid", "nu pornește"]
  }
];

const steps = [
  {
    nr: "1",
    title: "Trimiți cererea",
    text: "Completezi formularul online sau prin WhatsApp demo în câteva minute."
  },
  {
    nr: "2",
    title: "Confirmăm datele",
    text: "Te contactăm pentru a confirma detaliile și a organiza transportul."
  },
  {
    nr: "3",
    title: "Predai echipamentul",
    text: "Trimiți prin curier sau predai direct la service, după confirmare."
  },
  {
    nr: "4",
    title: "Diagnosticăm și reparăm",
    text: "Identificăm defecțiunea și îți comunicăm soluția și costul estimat."
  },
  {
    nr: "5",
    title: "Primești statusul",
    text: "Urmărești online etapa reparației și ridici sau primești echipamentul reparat."
  }
];

const digitalFeatures = [
  { Icon: Smartphone, text: "Trimiți cererea online în câteva minute, fără cont" },
  { Icon: Hash, text: "Primești număr de cerere și link personal de urmărire" },
  { Icon: ClipboardList, text: "Atașezi fotografii și detalii despre echipament" },
  { Icon: Link2, text: "Urmărești online etapa reparației în orice moment" },
  { Icon: ShieldCheck, text: "Proces mai clar, mai organizat, fără telefoane inutile" }
];

const trustPoints = [
  {
    Icon: ClipboardList,
    title: "Număr de cerere și status online",
    desc: "Primești un link personal pentru a vedea statusul cererii tale în orice moment."
  },
  {
    Icon: ShieldCheck,
    title: "Comunicare înainte de reparație",
    desc: "Îți comunicăm diagnosticul și costul estimat înainte de a începe reparația."
  },
  {
    Icon: Clock,
    title: "Proces documentat",
    desc: "Fotografii, documente și note interne pentru fiecare cerere în parte."
  },
  {
    Icon: MapPin,
    title: "București și Ilfov",
    desc: "Lucrăm cu echipamente din București și județul Ilfov."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean">
              <Wrench className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-950">
              AGROMASTER SERVICE
            </span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/reparatii"
              className="hidden text-sm font-medium text-slate-600 hover:text-ocean sm:inline"
            >
              Servicii
            </Link>
            <Link
              href="/whatsapp-demo"
              className="hidden text-sm font-medium text-slate-600 hover:text-ocean sm:inline"
            >
              Cerere rapidă
            </Link>
            <Link
              href="/cerere-service"
              className="inline-flex min-h-9 items-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark"
            >
              Solicită reparație
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-ocean">
            AGROMASTER SERVICE · București / Ilfov
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Reparații scule, utilaje de grădină și echipamente în București
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Diagnosticare, service și transport pentru aparate de spălat cu presiune, drujbe,
            motocoase, generatoare, mașini de tuns iarba și scule electrice.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-400">
            {["Fără cont necesar", "Primești număr de cerere", "Status urmărit online"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-ocean" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cerere-service"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ocean px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ocean-dark"
            >
              <ClipboardList className="h-5 w-5" aria-hidden="true" />
              Solicită reparație
            </Link>
            <Link
              href="/whatsapp-demo"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-600 bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Încearcă demo WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* Fast request strip */}
      <div className="border-b border-ocean/20 bg-ocean/5">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-slate-800">
            ⚡ Trimite cererea în 2 minute —{" "}
            <Link href="/cerere-service" className="text-ocean underline underline-offset-2 hover:text-ocean-dark">
              Solicită reparație
            </Link>{" "}
            sau{" "}
            <Link href="/whatsapp-demo" className="text-ocean underline underline-offset-2 hover:text-ocean-dark">
              Încearcă demo WhatsApp
            </Link>
          </p>
        </div>
      </div>

      {/* Service categories */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-950">Echipamente pe care le reparăm</h2>
          <p className="mt-1 text-sm text-slate-500">
            Lucrăm cu echipamente de tip profesional și de grădină, indiferent de marcă.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {serviceCategories.map(({ label, href, Icon, symptoms }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col items-start gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-soft transition hover:border-ocean/40 hover:shadow-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-ocean/10 text-ocean transition group-hover:bg-ocean group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-slate-950 leading-snug">{label}</span>
                <ul className="flex flex-col gap-0.5">
                  {symptoms.map((s) => (
                    <li key={s} className="text-xs text-slate-500 leading-5">· {s}</li>
                  ))}
                </ul>
                <span className="mt-auto flex items-center gap-1 text-xs font-medium text-ocean">
                  Detalii <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Digital differentiation */}
      <section className="border-y border-slate-200 bg-slate-900 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ocean">
                Diferit față de un service obișnuit
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                Service organizat digital, nu doar un număr de telefon
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                La AGROMASTER SERVICE, fiecare cerere de service este înregistrată, documentată și
                urmărită digital. Știi exact în ce etapă se află echipamentul tău.
              </p>
            </div>
            <ul className="space-y-4">
              {digitalFeatures.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ocean">
                    <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5-step process */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-950">Cum funcționează procesul de service</h2>
          <p className="mt-1 text-sm text-slate-500">De la cerere la echipament reparat, în 5 pași clari.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(({ nr, title, text }) => (
              <div key={nr} className="relative flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-soft">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean text-sm font-extrabold text-white">
                  {nr}
                </div>
                <p className="text-sm font-bold text-slate-950">{title}</p>
                <p className="text-xs leading-5 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courier section */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Cum trimitem echipamentul?</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Ai mai multe opțiuni pentru a aduce echipamentul la service. Le stabilim împreună
                după ce cererea este confirmată.
              </p>
            </div>
            <ul className="space-y-4">
              {[
                {
                  Icon: Package,
                  title: "Trimitere prin curier",
                  desc: "Ambalezi echipamentul și îl trimiți pe adresa noastră. Detaliile le primești după confirmare."
                },
                {
                  Icon: Truck,
                  title: "Preluare sau predare directă",
                  desc: "Pentru anumite echipamente, preluarea poate fi organizată după confirmarea solicitării."
                },
                {
                  Icon: MapPin,
                  title: "Predare la service",
                  desc: "Poți aduce direct echipamentul la service. Adresa se comunică după înregistrarea cererii."
                }
              ].map(({ Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ocean/10">
                    <Icon className="h-4 w-4 text-ocean" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-950">De ce AGROMASTER SERVICE</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-md border border-slate-200 bg-white p-5 shadow-soft">
                <Icon className="h-6 w-6 text-ocean" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-slate-950">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B section */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-6 shadow-soft lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean">
                <Building2 className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">Ai mai multe echipamente?</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Lucrăm și cu firme, administratori și clienți care au mai multe utilaje sau scule de service.
                  Poți trimite o solicitare pentru mai multe echipamente. În curând: flux dedicat pentru
                  service și mentenanță periodică.
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {[
                    "Cerere pentru mai multe echipamente",
                    "Clienți persoane juridice",
                    "Mentenanță planificată — în curând"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-slate-500">
                      <CheckCircle className="h-3.5 w-3.5 text-ocean" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5 shrink-0 lg:mt-0">
              <Link
                href="/cerere-service"
                className="inline-flex min-h-10 items-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ocean-dark"
              >
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Solicită o ofertă
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-slate-950">
              Echipamentul tău are o problemă?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Trimite cererea în 2 minute. Fără cont. Primești număr de cerere și status online.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/cerere-service"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ocean px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ocean-dark"
              >
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
                Solicită reparație
              </Link>
              <Link
                href="/whatsapp-demo"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Încearcă demo WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop teaser */}
      <section className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-md border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-widest text-ocean">În curând</p>
            <h2 className="mt-2 text-lg font-bold text-slate-950">
              Magazin online: piese, accesorii și echipamente
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Lucrăm la deschiderea unui magazin online cu piese de schimb, accesorii și echipamente
              de grădină și construcții. Revino în curând.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ocean">
                <Wrench className="h-3.5 w-3.5 text-white" aria-hidden="true" />
              </div>
              <span className="font-semibold text-slate-900">AGROMASTER SERVICE</span>
            </div>
            <p>Service reparații scule și utilaje de grădină · București / Ilfov</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/reparatii" className="hover:text-ocean">Servicii</Link>
              <Link href="/cerere-service" className="hover:text-ocean">Cerere service</Link>
              <Link href="/whatsapp-demo" className="hover:text-ocean">WhatsApp demo</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
