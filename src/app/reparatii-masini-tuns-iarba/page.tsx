import Link from "next/link";
import { ArrowLeft, CheckCircle, ClipboardList, MessageCircle, Package, Wrench } from "lucide-react";

export const metadata = {
  title: "Reparații mașini de tuns iarba București | AGROMASTER SERVICE",
  description:
    "Service și reparații mașini de tuns iarba în București și Ilfov. Diagnosticare pentru mașini pe benzină, electrice și pe acumulator. Trimite cererea online în 2 minute."
};

const symptoms = [
  { symptom: "Nu pornește sau pornește greu", detail: "Bujie uzată, filtru de aer înfundat, carburator defect sau borna de pornire electrică cu probleme." },
  { symptom: "Motorul se oprește singur în timpul lucrului", detail: "Suprasarcină, ulei insuficient, filtru înfundat sau governor defect." },
  { symptom: "Lama nu se rotește sau se rotește lent", detail: "Curea de transmisie uzată sau ruptă, ambreiaj defect sau pana lamei cedată." },
  { symptom: "Vibrații excesive sau dezechilibru", detail: "Lama dezechilibrată, îndoită sau cu uzură asimetrică — necesită înlocuire sau echilibrare." },
  { symptom: "Pierde putere la iarbă deasă", detail: "Filtru de aer înfundat, carburator neregulat sau lama tocită." },
  { symptom: "Propulsia nu funcționează", detail: "Transmisie uzată, cablu de propulsie rupt sau roți motrice defecte." },
  { symptom: "Zgomot anormal sau bătăi la motor", detail: "Rulmenți uzați, palete afectate sau piese slăbite intern." },
  { symptom: "Mașina electrică nu pornește", detail: "Motor electric defect, întrerupător sau cablu de alimentare deteriorat." }
];

const prepare = [
  "Goliți rezervorul de benzină complet dacă este model pe benzină",
  "Scoateți lama dacă este posibil și ambalați-o separat (nu obligatoriu)",
  "Notați marca, modelul și lățimea de tundere",
  "Fotografiați mașina și zona cu problema și descrieți simptomul"
];

const faqs = [
  {
    q: "Reparați mașini de tuns pe benzină și electrice?",
    a: "Da, lucrăm cu mașini de tuns iarba pe benzină, electrice cu cablu și pe acumulator, de uz casnic și semi-profesional."
  },
  {
    q: "Puteți ascuți sau înlocui lama?",
    a: "Da, ascuțim și echilibrăm lame și le înlocuim dacă uzura este avansată. Vă comunicăm disponibilitatea pieselor după diagnosticare."
  },
  {
    q: "Este obligatorie golirea rezervorului?",
    a: "Da, pentru modelele pe benzină rezervorul trebuie golit complet înainte de transport."
  },
  {
    q: "Reparați și sistemul de propulsie?",
    a: "Da, diagnosticăm și reparăm sistemul de propulsie, cabluri de transmisie și roți motrice."
  },
  {
    q: "Cât durează reparația?",
    a: "Vă comunicăm termenul estimat după diagnosticare. Reparațiile simple (lame, curele) se fac de obicei rapid; piesele speciale pot necesita mai mult timp."
  }
];

export default function ReparatiiMasiniTunsIarbaPage() {
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
              <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                Reparații mașini de tuns iarba
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Service pentru mașini de tuns iarba în București și Ilfov. Lucrăm cu modele pe benzină,
            electrice și pe acumulator, de uz casnic și profesional.
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
          <p className="mt-1 text-sm text-slate-500">Recunoașteți una din situațiile de mai jos? Trimiteți cererea de diagnosticare.</p>
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
              <h3 className="text-sm font-bold text-slate-950">Transport și predare</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Mașinile de tuns mici pot fi trimise prin curier bine ambalate. Pentru modele mai mari,
                predarea directă la service poate fi mai practică. Detaliile se stabilesc după confirmarea cererii.
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
