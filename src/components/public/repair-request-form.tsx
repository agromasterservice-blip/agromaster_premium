"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, FileText, Wrench } from "lucide-react";
import {
  CATEGORY_LABELS,
  EQUIPMENT_CATEGORIES,
  FUEL_REQUIRED_CATEGORIES,
  type EquipmentCategoryValue
} from "@/lib/constants";

export function RepairRequestForm() {
  const [category, setCategory] = useState<EquipmentCategoryValue>("PRESSURE_WASHER");
  const needsFuelConfirmation = useMemo(
    () => FUEL_REQUIRED_CATEGORIES.has(category),
    [category]
  );

  return (
    <form
      action="/api/public/repair-requests"
      method="post"
      encType="multipart/form-data"
      className="space-y-8"
    >
      <input type="hidden" name="repairType" value="WARRANTY" />

      <section className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <Wrench className="mt-0.5 h-5 w-5 text-ocean" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-slate-950">Diagnosticare profesională</p>
            <p className="text-xs leading-5 text-slate-500">Verificăm echipamentul și identificăm defecțiunea.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ClipboardList className="mt-0.5 h-5 w-5 text-ocean" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-slate-950">Urmărire status</p>
            <p className="text-xs leading-5 text-slate-500">Primiți un link de urmărire a cererii.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 text-ocean" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-slate-950">Proces transparent</p>
            <p className="text-xs leading-5 text-slate-500">Fotografii, documente și status actualizat.</p>
          </div>
        </div>
      </section>

      <FormSection title="Date client">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nume și prenume" name="fullName" required />
          <Field label="Telefon" name="phone" type="tel" required />
          <Field label="WhatsApp" name="whatsapp" type="tel" required />
          <Field label="Email" name="email" type="email" />
        </div>
      </FormSection>

      <FormSection title="Adresă (ridicare sau predare)">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Județ / Sector" name="county" required />
          <Field label="Oraș / localitate" name="city" required />
          <Field label="Stradă" name="street" required />
          <Field label="Număr" name="number" required />
          <Field label="Cod poștal" name="postalCode" />
          <Field label="Bloc / scară / apartament" name="addressDetails" />
        </div>
        <div className="mt-4">
          <label className="label" htmlFor="pickupNotes">
            Observații (program acasă, reper, mod predare)
          </label>
          <textarea className="field min-h-24" id="pickupNotes" name="pickupNotes" />
        </div>
      </FormSection>

      <FormSection title="Date echipament">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="category">
              Tip echipament
            </label>
            <select
              className="field"
              id="category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value as EquipmentCategoryValue)}
              required
            >
              {EQUIPMENT_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {CATEGORY_LABELS[item]}
                </option>
              ))}
            </select>
          </div>
          <Field label="Brand" name="brand" required />
          <Field label="Model" name="model" required />
          <Field label="Serie produs" name="serialNumber" />
          <Field label="Data achiziției (opțional)" name="purchaseDate" type="date" />
          <Field label="Magazin / vânzător (opțional)" name="purchaseStore" />
        </div>
        <div className="mt-4">
          <label className="label" htmlFor="accessories">
            Accesorii trimise împreună cu produsul
          </label>
          <textarea className="field min-h-24" id="accessories" name="accessories" />
        </div>

        {needsFuelConfirmation ? (
          <label className="mt-4 flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-slate-800">
            <input className="mt-1 h-4 w-4" type="checkbox" name="fuelTankEmpty" required />
            <span>
              Confirm că rezervorul de combustibil este golit înainte de predare / ridicare de curier.
            </span>
          </label>
        ) : null}
      </FormSection>

      <FormSection title="Defecțiune și documente">
        <label className="label" htmlFor="faultDescription">
          Descriere problemă / defecțiune
        </label>
        <textarea className="field min-h-32" id="faultDescription" name="faultDescription" required />
        <p className="hint">Descrieți când apare problema și ce ați observat.</p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <FileField label="Foto echipament" name="equipmentPhoto" accept="image/*" />
          <FileField label="Foto defect / zonă afectată" name="defectPhoto" accept="image/*" />
          <FileField
            label="Document achiziție (opțional)"
            name="warrantyDocument"
            accept="application/pdf,image/*"
            optional
          />
        </div>
      </FormSection>

      <label className="flex gap-3 rounded-md border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
        <input className="mt-1 h-4 w-4" type="checkbox" name="gdprConsent" required />
        <span>
          Sunt de acord cu prelucrarea datelor personale în scopul înregistrării, diagnosticării și
          reparării echipamentului.
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-ocean px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ocean-dark focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2"
      >
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        Trimite cererea de service
      </button>
    </form>
  );
}

function FormSection({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="section-title">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input className="field" id={name} name={name} type={type} required={required} />
    </div>
  );
}

function FileField({
  label,
  name,
  accept,
  optional = false
}: {
  label: string;
  name: string;
  accept: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="field file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700"
        id={name}
        name={name}
        type="file"
        accept={accept}
        required={!optional}
      />
    </div>
  );
}
