import Link from "next/link";
import { ArrowLeft, CheckCircle, ClipboardList, MessageCircle, Package, Wrench } from "lucide-react";

export const metadata = {
  title: "Reparații motocoase București | AGROMASTER SERVICE",
  description:
    "Service și reparații motocoase în București și Ilfov. Diagnosticare pentru motocoase pe benzină și electrice: Stihl, Husqvarna, Bosch, Makita și alte mărci."
};

const symptoms = [
  { symptom: "Nu pornește sau pornește greu", detail: "Bujie uzată, filtru de aer sau combustibil înfundat, carburator defect." },
  { symptom: "Pierde putere sau se înăbușă la sarcină", detail: "Carburator neregulat, filtru înfundat sau compresie scăzută." },
  { symptom: "Capul de tuns nu se rotește", detail: "Ambreiaj centrifugal uzat sau capul de tuns blocat." },
  { symptom: "Firul de nylon nu iese sau nu se desfășoară", detail: "Capul de tuns defect, arc rupt sau fir înfășurat incorect." },
  { symptom: "Vibrații excesive în timpul funcționării", detail: "Capul de tuns dezechilibrat, amortizoare uzate sau piese slăbite." },
  { symptom: "Zgomot anormal la accelerație", detail: "Rulmenți uzați, piese slăbite sau probleme la transmisie." },
  { symptom: "Scurgere de combustibil", detail: "Garnituri deteriorate sau carburator fisurat — necesită intervenție urgentă." },
  { symptom: "Motocoasa electrică nu pornește", detail: "Motor electric defect, cablu deteriorat sau întrerupător defect." }
];

const prepare = [
  "Goliți rezervorul de benzină complet — obligatoriu pentru transport",
  "Scoateți firul de nylon din capul de tuns dacă este posibil",
  "Notați marca, modelul și tipul capului de tuns",
  "Fotografiați motocoasa și zona cu problema"
];

const faqs = [
  {
    q: "Reparați motocoase pe benzină și electrice?",
    a: "Da, lucrăm cu motocoase pe benzină cu 2 timpi, motocoase electrice cu cablu și pe acumulator. Nu suntem service autorizat al niciunei mărci."
  },
  {
    q: "Este obligatorie golirea rezervorului?",
    a: "Da, rezervorul trebuie golit complet înainte de transport. Este o cerință de siguranță obligatorie pentru curier."
  },
  {
    q: "Puteți înlocui capul de tuns sau firul?",
    a: "Da, înlocuim capete de tuns, fire de nylon și efectuăm reglaje complete. Vă comunicăm disponibilitatea pieselor după diagnosticare."
  },
  {
    q: "Cât durează reparația?",
    a: "Depinde de complexitatea defecțiunii și disponibilitatea pieselor. Vă anunțăm termenul estimat după diagnosticare, înainte de a începe reparația."
  }
];

export default function ReparatiiMotocoasePage() {
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
              <Wrench className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ocean">AGROMASTER SERVICE</p>
              <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">Reparații motocoase</h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Service pentru motocoase și trimere în București și Ilfov. Lucrăm cu echipamente pe
            benzină, electrice și pe acumulator, de uz casnic și profesional.
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
        <section className="rounded-md border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">⚠ Atenție la transport</p>
          <p className="mt-1 text-sm text-amber-800">
            Motocoasele pe benzină trebuie să aibă rezervorul complet golit înainte de a fi trimise. Aceasta este o cerință de siguranță obligatorie.
          </p>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">Simptome și probleme frecvente</h2>
          <p className="mt-1 text-sm text-slate-500">Dacă recunoașteți un simptom, trimiteți cererea și vă contactăm.</p>
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
              <h3 className="text-sm font-bold text-slate-950">Trimitere prin curier sau predare directă</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Puteți trimite motocoasa prin curier sau o puteți preda la service. Detaliile de
                transport se stabilesc după confirmarea cererii. Asigurați-vă că rezervorul este gol.
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
