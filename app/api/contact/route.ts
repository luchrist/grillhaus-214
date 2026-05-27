import { NextRequest, NextResponse } from "next/server";
import { restaurant } from "@/lib/restaurant";

interface ContactPayload {
  name?: string;
  telefon?: string;
  email?: string;
  nachricht?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Ungültiges Anfrage-Format." },
      { status: 400 }
    );
  }

  const { name, telefon, email, nachricht } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name ist erforderlich." }, { status: 422 });
  }
  if (!telefon?.trim()) {
    return NextResponse.json({ error: "Telefonnummer ist erforderlich." }, { status: 422 });
  }
  if (email?.trim() && !isValidEmail(email)) {
    return NextResponse.json({ error: "Bitte gültige E-Mail-Adresse eingeben." }, { status: 422 });
  }

  console.log(`[contact] Kontaktanfrage ${restaurant.name}:`, {
    name,
    telefon,
    email: email ?? "",
    nachricht: nachricht ?? "",
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      success: true,
      message: `Vielen Dank, ${name}! Ihre Nachricht ist bei uns eingegangen. Wir melden uns schnellstmöglich unter der angegebenen Telefonnummer.`,
    },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ error: "Methode nicht erlaubt." }, { status: 405 });
}
