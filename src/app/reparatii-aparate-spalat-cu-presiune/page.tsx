import Link from "next/link";
import { ArrowLeft, CheckCircle, ClipboardList, Droplets, MessageCircle, Package } from "lucide-react";

export const metadata = {
  title: "Reparații aparate de spălat cu presiune București | AGROMASTER SERVICE",
  description:
    "Service și reparații aparate de spălat cu presiune în București și Ilfov. Diagnosticare pentru Karcher, Bosch, Nilfisk, Stiga și alte mărci. Trimite cererea online în 2 minute."
};

const symptoms = [
  { symptom: "Nu face presiune sau presiune slabă", detail: "Pompa nu generează presiunea normală — posibil uzură pompă, filtru înfundat sau supapă defectă." },
  { symptom: "Nu pornește deloc", detail: "Motorul sau pompa nu răspunde la pornire — posibil motor ars, fișă defectă sau problemă electrică." },
  { symptom: "Pierde apă din corp sau fitinguri", detail: "Scurgeri vizibile din corp, furtun sau lance — posibil garnituri uzate sau conexiuni deteriorate." },
  { symptom: "Pompa bâzâie dar nu pompează", detail: "Motorul funcționează dar pompa nu aspiră apă — posibil pompă blocată sau aspirație cu aer." },
  { symptom: "Nu oprește apa când nu se trage pe trăgaci", detail: "Apa curge continuu — posibil bypass defect sau supapă de siguranță uzată." },
  { symptom: "Motorul se supraîncălzește sau se oprește", detail: "Aparatul se oprește singur după câteva minute de utilizare." },
  { symptom: "Lance sau pistol defect", detail: "Trăgaciul nu funcționează, lance crăpată sau fitinguri deteriorate." },
  { symptom: "Erori pe afișaj / nu pornește electric", detail: "Panou de control sau circuit electronic defect la modelele cu display." }
];

const prepare = [
  "Goliți rezervorul de detergent dacă este cazul",
  "Notați marca, modelul și numărul de serie de pe etichetă",
  "Pregătiți o fotografie cu aparatul și una cu zona defectă",
  "Descrieți când apare problema și de cât timp"
];

const faqs = [
  {
    q: "Reparați orice marcă de aparat de spălat cu presiune?",
    a: "Lucrăm cu aparate de spălat cu presiune electrice și pe benzină, indiferent de marcă: Karcher, Bosch, Nilfisk, Stiga, Greenworks, Makita și altele. Nu suntem service autorizat al niciunei mărci."
  },
  {
    q: "Cât durează diagnosticarea?",
    a: "Diagnosticăm echipamentul în general în 2–5 zile lucrătoare de la primire. Vă comunicăm soluția și costul estimat înainte de a începe reparația."
  },
  {
    q: "Pot trimite aparatul prin curier?",
    a: "Da. Ambalați bine aparatul și trimiteți-l pe adresa noastră. Detaliile de livrare le primiți după înregistrarea și confirmarea cererii."
  },
  {
    q: "Ce se întâmplă dacă nu se poate repara?",
    a: "Dacă echipamentul nu poate fi reparat sau costul nu se justifică, vă anunțăm și returnăm echipamentul. Vă comunicăm situația înainte de orice intervenție."
  },
  {
    q: "Merita repararea față de un aparat nou?",
    a: "Depinde de valoarea echipamentului și costul reparației. Vă oferim o evaluare onestă după diagnosticare, fără presiuni."
  }
];

export default function ReparatiiAparateSpalatCuPresiunePage() {
  return (
    <main className="min-h-screen bg-paper">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/reparatii" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-ocean">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Înapoi la servicii
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean">
              <Droplets className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ocean">AGROMASTER SERVICE</p>
              <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                Reparații aparate de spălat cu presiune
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Service pentru aparate de spălat cu presiune în București și Ilfov. Diagnosticăm și
            reparăm echipamente electrice și pe benzină, de uz casnic și profesional, indiferent de marcă.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/cerere-service" className="inline-flex min-h-10 items-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ocean-dark">
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              Solicită reparație
            </Link>
            <Link href="/whatsapp-demo" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Cerere rapidă WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">Simptome și probleme frecvente</h2>
          <p className="mt-1 text-sm text-slate-500">Recunoașteți una dintre situațiile de mai jos? Trimiteți cererea și vă contactăm.</p>
          <div className="mt-5 space-y-4">
            {symptoms.map(({ symptom, detail }) => (
              <div key={symptom} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ocean/10">
                  <span className="h-2 w-2 rounded-full bg-ocean" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{symptom}</p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-500">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">Ce să pregătiți înainte de a trimite</h2>
          <ul className="mt-4 space-y-2">
            {prepare.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-md border border-slate-200 bg-slate-50 p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 shrink-0 text-ocean" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-bold text-slate-950">Opțiuni de transport echipament</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Puteți trimite aparatul prin curier sau îl puteți preda direct. Detaliile de transport
                se stabilesc după confirmarea cererii. Vă rugăm să goliți rezervorul și să ambalați
                bine echipamentul înainte de expediere.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link href="/cerere-service" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ocean px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ocean-dark">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
            Solicită reparație
          </Link>
          <Link href="/whatsapp-demo" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Cerere rapidă WhatsApp
          </Link>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">Întrebări frecvente</h2>
          <div className="mt-4 space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <p className="text-sm font-semibold text-slate-950">{q}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
