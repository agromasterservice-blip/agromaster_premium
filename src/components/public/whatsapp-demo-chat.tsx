"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Check, FileUp, Loader2, Send, Wrench } from "lucide-react";

type StepId =
  | "fullName"
  | "phone"
  | "whatsapp"
  | "email"
  | "city"
  | "county"
  | "addressFull"
  | "category"
  | "brand"
  | "model"
  | "serialNumber"
  | "problem"
  | "equipmentPhoto"
  | "defectPhoto"
  | "accessories"
  | "packagingConfirmed"
  | "fuelTankEmpty"
  | "gdprAccepted";

type InputType = "text" | "tel" | "email" | "date" | "textarea" | "file" | "choice";

type Step = {
  id: StepId;
  question: string;
  type: InputType;
  placeholder?: string;
  optional?: boolean;
  accept?: string;
  choices?: Array<{ label: string; value: string; apiCategory?: ApiCategory; requiresFuel?: boolean }>;
};

type ApiCategory =
  | "PRESSURE_WASHER"
  | "CHAINSAW"
  | "BRUSHCUTTER"
  | "GENERATOR"
  | "LAWN_MOWER"
  | "PUMP"
  | "POWER_TOOL";

type Message = {
  id: string;
  side: "bot" | "user";
  text: string;
};

type Answers = {
  fullName?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  county?: string;
  addressFull?: string;
  category?: {
    label: string;
    apiCategory: ApiCategory;
    requiresFuel: boolean;
  };
  brand?: string;
  model?: string;
  serialNumber?: string;
  problem?: string;
  equipmentPhoto?: File;
  defectPhoto?: File;
  accessories?: string;
  packagingConfirmed?: boolean;
  fuelTankEmpty?: boolean;
  gdprAccepted?: boolean;
};

const steps: Step[] = [
  {
    id: "fullName",
    question: "Bună! Sunt asistentul AGROMASTER SERVICE. Care este numele și prenumele?",
    type: "text",
    placeholder: "Nume și prenume"
  },
  {
    id: "phone",
    question: "Mulțumesc. Ce număr de telefon putem folosi pentru contact?",
    type: "tel",
    placeholder: "07xx xxx xxx"
  },
  {
    id: "whatsapp",
    question: "Care este numărul de WhatsApp?",
    type: "tel",
    placeholder: "Poate fi același număr"
  },
  {
    id: "email",
    question: "Aveți și o adresă de email? Este opțional.",
    type: "email",
    placeholder: "email@example.com",
    optional: true
  },
  {
    id: "city",
    question: "În ce oraș sau localitate se află echipamentul?",
    type: "text",
    placeholder: "Oraș / localitate"
  },
  {
    id: "county",
    question: "Care este județul sau sectorul?",
    type: "text",
    placeholder: "Județ / sector"
  },
  {
    id: "addressFull",
    question: "Scrieți adresa completă pentru preluare sau predare.",
    type: "textarea",
    placeholder: "Stradă, număr, bloc, scară, apartament, repere"
  },
  {
    id: "category",
    question: "Ce tip de echipament trimiteți la service?",
    type: "choice",
    choices: [
      {
        label: "Aparat de spălat cu presiune",
        value: "pressure-washer",
        apiCategory: "PRESSURE_WASHER"
      },
      {
        label: "Motocoasă",
        value: "brushcutter",
        apiCategory: "BRUSHCUTTER",
        requiresFuel: true
      },
      { label: "Drujbă", value: "chainsaw", apiCategory: "CHAINSAW", requiresFuel: true },
      { label: "Generator", value: "generator", apiCategory: "GENERATOR", requiresFuel: true },
      {
        label: "Mașină de tuns iarba",
        value: "lawn-mower",
        apiCategory: "LAWN_MOWER",
        requiresFuel: true
      },
      { label: "Pompă", value: "pump", apiCategory: "PUMP" },
      { label: "Sculă electrică", value: "power-tool", apiCategory: "POWER_TOOL" },
      { label: "Sculă pe acumulator", value: "battery-tool", apiCategory: "POWER_TOOL" },
      { label: "Alt echipament", value: "other", apiCategory: "POWER_TOOL" }
    ]
  },
  {
    id: "brand",
    question: "Care este brandul echipamentului?",
    type: "text",
    placeholder: "Brand (ex: Karcher, Stihl, Bosch)"
  },
  {
    id: "model",
    question: "Care este modelul?",
    type: "text",
    placeholder: "Model"
  },
  {
    id: "serialNumber",
    question: "Care este numărul de serie? Dacă nu îl găsiți, scrieți 'Nu știu'.",
    type: "text",
    placeholder: "Număr de serie"
  },
  {
    id: "problem",
    question: "Descrieți problema cât mai clar. Ce se întâmplă și de când?",
    type: "textarea",
    placeholder: "Când apare defectul, ce observați, ce ați încercat"
  },
  {
    id: "equipmentPhoto",
    question: "Încărcați o fotografie cu echipamentul.",
    type: "file",
    accept: "image/*"
  },
  {
    id: "defectPhoto",
    question: "Încărcați o fotografie cu zona defectă sau cu problema vizibilă.",
    type: "file",
    accept: "image/*"
  },
  {
    id: "accessories",
    question: "Ce accesorii trimiteți împreună cu echipamentul?",
    type: "textarea",
    placeholder: "Ex: furtun, acumulator, încărcător. Dacă nu trimiteți nimic, scrieți Nu."
  },
  {
    id: "packagingConfirmed",
    question: "Confirmați că echipamentul va fi ambalat corespunzător pentru transport?",
    type: "choice",
    choices: [
      { label: "Da, confirm", value: "yes" },
      { label: "Nu încă", value: "no" }
    ]
  },
  {
    id: "fuelTankEmpty",
    question:
      "Echipamentul este pe benzină. Confirmați că rezervorul de combustibil este golit complet înainte de transport.",
    type: "choice",
    choices: [
      { label: "Da, rezervorul este gol", value: "yes" },
      { label: "Nu", value: "no" }
    ]
  },
  {
    id: "gdprAccepted",
    question:
      "Acceptați prelucrarea datelor personale pentru înregistrarea și procesarea cererii de service?",
    type: "choice",
    choices: [
      { label: "Accept", value: "yes" },
      { label: "Nu accept", value: "no" }
    ]
  }
];

const initialMessages: Message[] = [
  {
    id: "intro-1",
    side: "bot",
    text: "AGROMASTER SERVICE — reparații scule și utilaje de grădină în București și Ilfov. Completați rapid cererea de service și vă contactăm pentru detalii."
  }
];

export function WhatsappDemoChat() {
  const [currentStepId, setCurrentStepId] = useState<StepId | null>("fullName");
  const [answers, setAnswers] = useState<Answers>({});
  const [messages, setMessages] = useState<Message[]>([
    ...initialMessages,
    { id: "question-fullName", side: "bot", text: steps[0].question }
  ]);
  const [textValue, setTextValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentStep = useMemo(
    () => steps.find((step) => step.id === currentStepId) ?? null,
    [currentStepId]
  );
  const isSummary = !currentStep && !submittedCode;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, currentStepId, isSummary, submittedCode, error]);

  function addMessage(side: Message["side"], text: string) {
    setMessages((current) => [
      ...current,
      { id: `${side}-${Date.now()}-${Math.random()}`, side, text }
    ]);
  }

  function moveToNext(updatedAnswers: Answers) {
    const currentIndex = steps.findIndex((step) => step.id === currentStepId);
    const nextStep = steps.slice(currentIndex + 1).find((step) => {
      if (step.id === "fuelTankEmpty") {
        return Boolean(updatedAnswers.category?.requiresFuel);
      }
      return true;
    });

    if (!nextStep) {
      setCurrentStepId(null);
      addMessage("bot", "Am completat toate datele. Verificați sumarul înainte de trimitere.");
      return;
    }

    setCurrentStepId(nextStep.id);
    addMessage("bot", nextStep.question);
  }

  function saveAnswer(value: string | boolean | File, displayValue: string) {
    if (!currentStep) {
      return;
    }

    const updatedAnswers = { ...answers };

    switch (currentStep.id) {
      case "category": {
        const choice = currentStep.choices?.find((item) => item.label === displayValue);
        updatedAnswers.category = {
          label: displayValue,
          apiCategory: choice?.apiCategory ?? "POWER_TOOL",
          requiresFuel: Boolean(choice?.requiresFuel)
        };
        break;
      }
      case "packagingConfirmed":
        updatedAnswers.packagingConfirmed = value === true;
        break;
      case "fuelTankEmpty":
        updatedAnswers.fuelTankEmpty = value === true;
        break;
      case "gdprAccepted":
        updatedAnswers.gdprAccepted = value === true;
        break;
      case "equipmentPhoto":
      case "defectPhoto":
        updatedAnswers[currentStep.id] = value as File;
        break;
      default:
        updatedAnswers[currentStep.id] = String(value);
    }

    setAnswers(updatedAnswers);
    addMessage("user", displayValue);
    setError("");
    setTextValue("");
    setSelectedFile(null);
    moveToNext(updatedAnswers);
  }

  function handleTextSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentStep) {
      return;
    }

    const trimmed = textValue.trim();

    if (!trimmed && !currentStep.optional) {
      setError("Completați răspunsul pentru a continua.");
      return;
    }

    saveAnswer(trimmed, trimmed || "Nu este indicat");
  }

  function handleFileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) {
      setError("Selectați un fișier pentru a continua.");
      return;
    }

    saveAnswer(selectedFile, selectedFile.name);
  }

  function handleChoice(label: string, value: string) {
    if (currentStep?.id === "packagingConfirmed" && value !== "yes") {
      setError("Pentru trimitere este necesară confirmarea ambalării.");
      return;
    }

    if (currentStep?.id === "fuelTankEmpty" && value !== "yes") {
      setError("Pentru echipamente pe benzină, rezervorul golit este obligatoriu.");
      return;
    }

    if (currentStep?.id === "gdprAccepted" && value !== "yes") {
      setError("Pentru înregistrarea cererii este necesar acordul privind datele personale.");
      return;
    }

    saveAnswer(value === "yes" ? true : value, label);
  }

  async function submitRepairRequest() {
    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const category = answers.category;
      const pickupNotes = [
        "Cerere creată din pagina WhatsApp demo AGROMASTER SERVICE.",
        "Confirmare ambalare: Da.",
        category?.label === "Alt echipament" ? "Tip echipament selectat: Alt echipament." : ""
      ]
        .filter(Boolean)
        .join(" ");

      formData.append("repairType", "WARRANTY");
      formData.append("fullName", answers.fullName ?? "");
      formData.append("phone", answers.phone ?? "");
      formData.append("whatsapp", answers.whatsapp ?? "");
      formData.append("email", answers.email ?? "");
      formData.append("county", answers.county ?? "");
      formData.append("city", answers.city ?? "");
      formData.append("street", answers.addressFull ?? "");
      formData.append("number", "-");
      formData.append("addressDetails", answers.addressFull ?? "");
      formData.append("pickupNotes", pickupNotes);
      formData.append("category", category?.apiCategory ?? "POWER_TOOL");
      formData.append("brand", answers.brand ?? "");
      formData.append("model", answers.model ?? "");
      formData.append("serialNumber", answers.serialNumber ?? "");
      formData.append("purchaseDate", "");
      formData.append("purchaseStore", "");
      formData.append("accessories", answers.accessories || "Nu au fost indicate accesorii.");
      formData.append(
        "faultDescription",
        [
          category?.label === "Alt echipament"
            ? "Tip echipament selectat în WhatsApp demo: Alt echipament."
            : "",
          answers.problem ?? ""
        ]
          .filter(Boolean)
          .join("\n\n")
      );
      formData.append("gdprConsent", "on");

      if (category?.requiresFuel) {
        formData.append("fuelTankEmpty", "on");
      }

      if (answers.equipmentPhoto) {
        formData.append("equipmentPhoto", answers.equipmentPhoto);
      }
      if (answers.defectPhoto) {
        formData.append("defectPhoto", answers.defectPhoto);
      }

      const response = await fetch("/api/public/repair-requests", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });
      const payload = (await response.json()) as { publicCode?: string; errors?: string[] };

      if (!response.ok || !payload.publicCode) {
        throw new Error(payload.errors?.join(" ") || "Cererea nu a putut fi trimisă.");
      }

      setSubmittedCode(payload.publicCode);
      addMessage(
        "bot",
        `Cererea a fost înregistrată. Număr cerere: ${payload.publicCode}. Echipa AGROMASTER SERVICE va verifica datele și vă va contacta pentru detalii.`
      );
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Cererea nu a putut fi trimisă.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-200 px-3 py-4 sm:px-6">
      <section className="mx-auto flex h-[calc(100vh-2rem)] max-w-md flex-col overflow-hidden rounded-md bg-[#efe7dc] shadow-soft ring-1 ring-black/10">
        <header className="flex items-center gap-3 bg-ocean px-4 py-3 text-white">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
            <Wrench className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold">AGROMASTER SERVICE</h1>
            <p className="text-xs text-white/80">asistent service</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-2">
            {messages.map((message) => (
              <ChatBubble key={message.id} side={message.side} text={message.text} />
            ))}

            {isSummary ? <Summary answers={answers} onSubmit={submitRepairRequest} loading={isSubmitting} /> : null}

            {submittedCode ? (
              <div className="mt-4 rounded-md bg-white/90 p-4 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold text-slate-950">Cerere trimisă</p>
                <p className="mt-1">Numărul cererii: {submittedCode}</p>
                <a
                  href={`/multumim/${submittedCode}`}
                  className="mt-3 inline-flex min-h-10 items-center justify-center rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark"
                >
                  Vezi cererea și statusul
                </a>
              </div>
            ) : null}

            {error ? (
              <div className="ml-auto max-w-[86%] rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 shadow-sm">
                {error}
              </div>
            ) : null}
            <div ref={scrollRef} />
          </div>
        </div>

        {!isSummary && !submittedCode && currentStep ? (
          <ChatInput
            step={currentStep}
            textValue={textValue}
            onTextChange={setTextValue}
            onTextSubmit={handleTextSubmit}
            onFileChange={setSelectedFile}
            onFileSubmit={handleFileSubmit}
            selectedFile={selectedFile}
            onChoice={handleChoice}
          />
        ) : null}
      </section>
    </main>
  );
}

function ChatBubble({ side, text }: { side: "bot" | "user"; text: string }) {
  const isUser = side === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-md px-3 py-2 text-sm leading-6 shadow-sm ${
          isUser ? "bg-[#dcf8c6] text-slate-900" : "bg-white text-slate-800"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function ChatInput({
  step,
  textValue,
  onTextChange,
  onTextSubmit,
  onFileChange,
  onFileSubmit,
  selectedFile,
  onChoice
}: {
  step: Step;
  textValue: string;
  onTextChange: (value: string) => void;
  onTextSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFileChange: (file: File | null) => void;
  onFileSubmit: (event: FormEvent<HTMLFormElement>) => void;
  selectedFile: File | null;
  onChoice: (label: string, value: string) => void;
}) {
  if (step.type === "choice") {
    return (
      <div className="border-t border-black/10 bg-[#f7f7f7] p-3">
        <div className="grid gap-2">
          {step.choices?.map((choice) => (
            <button
              key={choice.value}
              type="button"
              onClick={() => onChoice(choice.label, choice.value)}
              className="min-h-10 rounded-md border border-ocean/30 bg-white px-3 py-2 text-left text-sm font-semibold text-ocean transition hover:bg-red-50"
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step.type === "file") {
    return (
      <form onSubmit={onFileSubmit} className="border-t border-black/10 bg-[#f7f7f7] p-3">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md bg-white px-3 py-2 text-sm text-slate-600 ring-1 ring-slate-200">
          <FileUp className="h-5 w-5 text-ocean" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate">
            {selectedFile ? selectedFile.name : "Selectați fișierul"}
          </span>
          <input
            type="file"
            accept={step.accept}
            className="sr-only"
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          />
        </label>
        <button
          type="submit"
          className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark"
        >
          <Check className="h-4 w-4" aria-hidden="true" />
          Confirmă fișierul
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onTextSubmit} className="flex gap-2 border-t border-black/10 bg-[#f7f7f7] p-3">
      {step.type === "textarea" ? (
        <textarea
          value={textValue}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder={step.placeholder}
          className="min-h-11 flex-1 resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
        />
      ) : (
        <input
          value={textValue}
          onChange={(event) => onTextChange(event.target.value)}
          placeholder={step.placeholder}
          type={step.type}
          className="min-h-11 flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
        />
      )}
      <button
        type="submit"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ocean text-white transition hover:bg-ocean-dark"
        aria-label="Trimite răspunsul"
      >
        <Send className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
}

function Summary({
  answers,
  onSubmit,
  loading
}: {
  answers: Answers;
  onSubmit: () => void;
  loading: boolean;
}) {
  const rows = [
    ["Nume", answers.fullName],
    ["Telefon", answers.phone],
    ["WhatsApp", answers.whatsapp],
    ["Email", answers.email || "Nu este indicat"],
    ["Oraș", answers.city],
    ["Județ / sector", answers.county],
    ["Adresă", answers.addressFull],
    ["Echipament", answers.category?.label],
    ["Brand", answers.brand],
    ["Model", answers.model],
    ["Serie", answers.serialNumber],
    ["Problemă", answers.problem],
    ["Foto echipament", answers.equipmentPhoto?.name],
    ["Foto defect", answers.defectPhoto?.name],
    ["Accesorii", answers.accessories],
    ["Ambalare", answers.packagingConfirmed ? "Confirmată" : ""],
    [
      "Combustibil",
      answers.category?.requiresFuel
        ? answers.fuelTankEmpty
          ? "Rezervor golit"
          : ""
        : "Nu se aplică"
    ],
    ["GDPR", answers.gdprAccepted ? "Acceptat" : ""]
  ];

  return (
    <div className="mt-4 rounded-md bg-white p-4 text-sm text-slate-700 shadow-sm">
      <h2 className="text-base font-semibold text-slate-950">Sumar cerere service</h2>
      <dl className="mt-3 space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[120px_1fr] gap-3">
            <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
            <dd className="min-w-0 break-words text-slate-900">{value || "-"}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-ocean px-4 py-2 text-sm font-semibold text-white transition hover:bg-ocean-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        Trimite cererea de service
      </button>
    </div>
  );
}
