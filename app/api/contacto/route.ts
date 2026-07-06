import { NextResponse } from "next/server";
import { appendMensaje } from "@/lib/mensajes/store";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as {
    nombre?: string;
    email?: string;
    mensaje?: string;
  };

  const nombre = body.nombre?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const mensaje = body.mensaje?.trim() ?? "";

  if (!nombre || !EMAIL_REGEX.test(email) || !mensaje) {
    return NextResponse.json(
      { error: "Completa nombre, correo válido y mensaje" },
      { status: 400 }
    );
  }

  try {
    await appendMensaje({ nombre, email, mensaje });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error guardando mensaje de contacto", error);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje" },
      { status: 500 }
    );
  }
}
