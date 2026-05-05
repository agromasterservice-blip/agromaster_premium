import Link from "next/link";
import { ArrowLeft, CheckCircle, ClipboardList, MessageCircle, Package, Zap } from "lucide-react";

export const metadata = {
  title: "Reparații generatoare București | AGROMASTER SERVICE",
  description:
    "Service și reparații generatoare în București și Ilfov. Diagnosticare pentru generatoare monofazate și trifazate de uz casnic și profesional. Trimite cererea online."
};

const symptoms = [
  { symptom: "Nu pornește sau pornește greu", detail: "Carburator înfundat cu combustibil vechi, bujie uzată sau problemă la pornitor." },
  { symptom: "Pornește dar nu produce curent", detail: "AVR (regulator de tensiune) defect, alternator defect sau circuit de excitație cu probleme." },
  { symptom: "Tensiune instabilă sau fluctuații", detail: "AVR uzat, probleme la înfășurările alternatorului sau sarcini neechilibrate." },
  { symptom: "Se oprește automat după câteva minute", detail: "Suprasarcină termică, ulei insuficient (senzor nivel ulei activ) sau governor defect." },
  { symptom: "Nu produce curentul corect (220V / 380V)", detail: "AVR defect, înfășurare arsă sau condensator de pornire defect." },
  { symptom: "Prize sau panoul de comandă defecte", detail: "Prize arse, disjunctor declanșat sau panou de control cu probleme." },
  { symptom: "Zgomot anormal la funcționare", detail: "Rulmenți uzați, piese slăbite sau probleme mecanice la motor." },
  { symptom: "Consum excesiv de combustibil", detail: "Carburator neregulat, filtru de aer înfundat sau motor cu uzură internă." }
];

const prepare = [
  "Goliți rezervorul de benzină sau motorină complet — obligatoriu",
  "Notați marca, modelul, puterea (kW/kVA) și numărul de serie",
  "Fotografiați panoul de comandă și zona defectă",
  "Descrieți exact ce se întâmplă și de când — dacă are erori sau semnale luminoase"
];

const faqs = [
  {
    q: "Reparați generatoare monofazate și trifazate?",
    a: "Da, lucrăm cu generatoare monofazate și trifazate de uz casnic și profesional, pe benzină și motorină, de diferite puteri."
  },
  {
    q: "Este obligatorie golirea rezervorului?",
    a: "Da, rezervorul trebuie golit complet înainte de transport. Este o cerință de siguranță obligatorie — atât pentru curier cât și pentru manipularea în service."
  },
  {
    q: "Puteți înlocui AVR-ul sau alternatorul?",
    a: "Da, înlocuim regulatoarele de tensiune (AVR), alternatoare, condensatoare și alte piese, dacă sunt disponibile pentru modelul respectiv."
  },
  {
    q: "Cât durează diagnosticarea unui generator?",
    a: "Diagnosticăm în 2–5 zile lucrătoare de la primire. Vă comunicăm costul estimat înainte de reparație."
  },
  {
    q: "Generatoarele mari pot fi transportate prin curier?",
    a: "Depinde de greutate și dimensiuni. Pentru generatoare mari, discutăm împreună cea mai bună metodă de transport după confirmarea cererii."
  }
];

export default function ReparatiiGeneratoarePage() {
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
              <Zap className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ocean">AGROMASTER SERVICE</p>
              <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">Reparații generatoare</h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Service pentru generatoare electrice în București și Ilfov. Diagnosticăm și reparăm
            generatoare monofazate și trifazate pe benzină și motorină, de uz casnic și profesional.
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
            Generatoarele pe benzină sau motorină trebuie să aibă rezervorul complet golit înainte de transport. Aceasta este o cerință de siguranță obligatorie.
          </p>
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-bold text-slate-950">Simptome și probleme frecvente</h2>
          <p className="mt-1 text-sm text-slate-500">Dacă generatorul dumneavoastră prezintă unul din simptomele de mai jos, trimiteți o cerere de diagnosticare.</p>
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
                Generatoarele mici pot fi trimise prin curier. Pentru generatoare mai mari, discutăm
                împreună cea mai bună metodă după confirmarea cererii. Adresa service-ului o primiți
                după înregistrare.
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
