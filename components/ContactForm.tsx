"use client";

import { useState, FormEvent } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { restaurant } from "@/lib/restaurant";

interface FormData {
  name: string;
  telefon: string;
  email: string;
  nachricht: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    telefon: "",
    email: "",
    nachricht: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name ist erforderlich.";
    if (!form.telefon.trim()) e.telefon = "Telefonnummer ist erforderlich.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Bitte gültige E-Mail-Adresse eingeben.";
    }
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setServerMessage(data.message ?? "Nachricht erfolgreich gesendet!");
        setForm({ name: "", telefon: "", email: "", nachricht: "" });
      } else {
        setStatus("error");
        setServerMessage(data.error ?? "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#C9A058]/10 border border-[#C9A058]/30 flex items-center justify-center">
          <CheckCircle size={32} className="text-[#C9A058]" />
        </div>
        <div>
          <h3 className="font-serif-kr text-2xl text-[#C9A058] mb-2">Vielen Dank!</h3>
          <p className="text-[#E8E0D5]/70 leading-relaxed max-w-sm">{serverMessage}</p>
          <p className="text-[#E8E0D5]/50 text-sm mt-2">
            Wir melden uns schnellstmöglich bei Ihnen.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#B91C1C] text-sm border-b border-[#B91C1C]/40 hover:border-[#B91C1C] transition-colors"
        >
          Weitere Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-[#C9A058] text-sm mb-1.5">Name *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ihr vollständiger Name"
          className="kr-input"
        />
        {errors.name && <p className="text-[#B91C1C] text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Telefon + E-Mail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#C9A058] text-sm mb-1.5">Telefon *</label>
          <input
            type="tel"
            name="telefon"
            value={form.telefon}
            onChange={handleChange}
            placeholder="z.B. 0174 1234567"
            className="kr-input"
          />
          {errors.telefon && <p className="text-[#B91C1C] text-xs mt-1">{errors.telefon}</p>}
        </div>
        <div>
          <label className="block text-[#C9A058] text-sm mb-1.5">
            E-Mail <span className="text-[#E8E0D5]/40 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ihre@email.de"
            className="kr-input"
          />
          {errors.email && <p className="text-[#B91C1C] text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Nachricht */}
      <div>
        <label className="block text-[#C9A058] text-sm mb-1.5">
          Nachricht <span className="text-[#E8E0D5]/40 font-normal">(optional)</span>
        </label>
        <textarea
          name="nachricht"
          value={form.nachricht}
          onChange={handleChange}
          rows={4}
          placeholder="Ihre Frage oder Nachricht an uns …"
          className="kr-input resize-none"
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <div className="flex items-start gap-3 p-4 bg-[#B91C1C]/10 border border-[#B91C1C]/30 rounded-sm">
          <AlertCircle size={18} className="text-[#B91C1C] shrink-0 mt-0.5" />
          <p className="text-[#E8E0D5]/80 text-sm">{serverMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#B91C1C] text-white py-3.5 px-6 rounded-sm font-medium tracking-wide hover:bg-[#991b1b] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Wird gesendet…
          </>
        ) : (
          "Nachricht senden"
        )}
      </button>

      <p className="text-[#E8E0D5]/35 text-xs text-center leading-relaxed">
        Mit dem Absenden stimmen Sie unserer{" "}
        <a href="/datenschutz" className="underline hover:text-[#C9A058] transition-colors">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}
