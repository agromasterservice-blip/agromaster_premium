import Link from "next/link";
import { ArrowLeft, Battery, CheckCircle, ClipboardList, MessageCircle, Package, Plug } from "lucide-react";

export const metadata = {
  title: "Reparații scule electrice și pe acumulator București | AGROMASTER SERVICE",
  description:
    "Service și reparații scule electrice și pe acumulator în București și Ilfov. Diagnosticare pentru polizoare, percutoare, șurubelnițe, ferăstraie și alte scule. Bosch, Makita, DeWalt și altele."
};

const symptoms = [
  { symptom: "Nu pornește sau pornește intermitent", detail: "Întrerupător defect, perii de carbon uzate, bobinaj ars sau conexiuni slăbite." },
  { symptom: "Pierde putere sau merge lent", detail: "Perii de carbon uzate, rotor sau stator cu probleme, tensiune insuficientă la acumulator." },
  { symptom: "Scântei vizibile la perii", detail: "Periile de carbon sunt uzate și necesită înlocuire — intervenție urgentă recomandată." },
  { symptom: "Miros de ars sau fum", detail: "Bobinaj ars sau scurtcircuit intern — opriți imediat utilizarea și trimiteți la diagnosticare." },
  { symptom: "Mandrina nu prinde sau nu eliberează", detail: "Mandrina uzată sau mecanismul de blocare deteriorat." },
  { symptom: "Scula pe acumulator nu pornește", detail: "Acumulator descărcat complet, celule deteriorate sau circuitul de protecție BMS activ." },
  { symptom: "Acumulatorul nu se mai încarcă", detail: "Celule deteriorate, BMS defect sau încărcător incompatibil/defect." },
  { symptom: "Reductor cu zgomot sau mers greu", detail: "Angrenaje uzate, lubrifiant lipsă sau rulmenți deteriorați." }
];

const prepare = [
  "Scoateți acumulatorul dacă este model pe acumulator",
  "Notați marca, modelul și voltajul (18V, 20V etc.) de pe eticheta sculei",
  "Fotografiați scula și zona defectă sau zona de unde ies scântei",
  "Descrieți exact problema și în ce situație apare"
];

const faqs = [
  {
    q: "Reparați scule pe acumulator de la Bosch, Makita, DeWalt?",
    a: "Da, lucrăm cu scule pe acumulator de la principalele mărci: Bosch, Makita, DeWalt, Milwaukee, Metabo, Ryobi și altele. Nu suntem service autorizat al niciunei mărci."
  },
  {
    q: "Puteți înlocui periile de carbon?",
    a: "Da, înlocuim periile de carbon pentru motoarele universale unde aceasta este posibilă și piesele sunt disponibile."
  },
  {
    q: "Reparați acumulatorii (bateriile)?",
    a: "Putem diagnostica acumulatorii și, în unele cazuri, înlocuim celulele. Depinde de modelul și starea acumulatorului. Vă comunicăm opțiunile după diagnosticare."
  },
  {
    q: "Merită repararea față de cumpărarea unei scule noi?",
    a: "Vă comunicăm costul estimat al reparației înainte de a începe. Decizia vă aparține. Nu vă taxăm reparația dacă nu o doriți după ce cunoașteți costul."
  },
  {
    q: "Pot trimite scula prin curier?",
    a: "Da, sculele electrice și pe acumulator se pot trimite ușor prin curier. Scoateți acumulatorul înainte de expediere. Detaliile adresei le primiți după confirmare."
  }
];

const toolTypes = [
  { Icon: Plug, title: "Scule electrice cu cablu", items: ["Polizoare unghiulare (flex)", "Polizoare drepte", "Percutoare și bormasini", "Ferăstraie circulare", "Ferăstraie sabie", "Șurubelnițe electrice", "Rindele și frezere"] },
  { Icon: Battery, title: "Scule pe acumulator", items: ["Șurubelnițe și insurubatoare", "Percutoare pe acumulator", "Polizoare pe acumulator", "Ferăstraie pe acumulator", "Rivetuire și alte unelte", "Acumulatori și încărcătoare"] }
];

export default function ReparatiiSculeElectricePage() {
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
              <Plug className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ocean">AGROMASTER SERVICE</p>
              <h1 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                Reparații scule electrice și pe acumulator
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Service pentru scule electrice și scule pe acumulator în București și Ilfov.
            Diagnosticăm și reparăm polizoare, percutoare, șurubelnițe, ferăstraie și alte scule
            de lucru, indiferent de marcă.
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
          <p className="mt-1 text-sm text-slate-500">Dacă scula dumneavoastră prezintă unul din simptomele de mai jos, trimiteți cererea de diagnosticare.</p>
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
          <h2 className="text-lg font-bold text-slate-950">Tipuri de scule pe care le reparăm</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {toolTypes.map(({ Icon, title, items }) => (
              <div key={title} className="rounded-md bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-ocean" aria-hidden="true" />
                  <p className="text-sm font-semibold text-slate-950">{title}</p>
                </div>
                <ul className="mt-3 space-y-1">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-slate-600">· {item}</li>
                  ))}
                </ul>
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
              <h3 className="text-sm font-bold text-slate-950">Trimitere prin curier</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Sculele electrice și pe acumulator se pot trimite ușor prin curier. Scoateți
                acumulatorul înainte de expediere și ambalați corespunzător. Detaliile adresei
                le primiți după confirmarea cererii.
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
