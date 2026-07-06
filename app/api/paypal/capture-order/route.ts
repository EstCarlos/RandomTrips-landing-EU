import { NextResponse } from "next/server";
import { captureOrder, calcularTotal } from "@/lib/paypal/client";
import { getPlanById } from "@/lib/data/planes";
import { appendReserva } from "@/lib/reservas/store";

type CaptureBody = {
  orderId?: string;
  planId?: string;
  viajeros?: string[];
  contacto?: {
    nombreCompleto?: string;
    email?: string;
    telefono?: string;
  };
};

export async function POST(request: Request) {
  const body = (await request.json()) as CaptureBody;
  const { orderId, planId, viajeros, contacto } = body;

  const plan = planId ? getPlanById(planId) : undefined;

  if (!orderId || !plan || !Array.isArray(viajeros) || viajeros.length === 0) {
    return NextResponse.json({ error: "Datos de reserva inválidos" }, { status: 400 });
  }

  if (
    !contacto?.nombreCompleto?.trim() ||
    !contacto?.email?.trim() ||
    !contacto?.telefono?.trim()
  ) {
    return NextResponse.json(
      { error: "Faltan datos del titular de la reserva" },
      { status: 400 }
    );
  }

  try {
    const captura = await captureOrder(orderId);

    if (captura.status !== "COMPLETED") {
      return NextResponse.json(
        { error: `El pago no se completó (estado: ${captura.status})` },
        { status: 402 }
      );
    }

    const montoTotal = calcularTotal(planId!, viajeros.length);

    const reserva = await appendReserva({
      planId: plan.id,
      planNombre: plan.nombre,
      montoTotal,
      paypalOrderId: captura.id,
      contacto: {
        nombreCompleto: contacto.nombreCompleto.trim(),
        email: contacto.email.trim(),
        telefono: contacto.telefono.trim(),
      },
      viajeros: viajeros.map((nombre) => nombre.trim()),
    });

    return NextResponse.json({ ok: true, reservaId: reserva.id });
  } catch (error) {
    console.error("Error capturando orden de PayPal", error);
    return NextResponse.json(
      { error: "No se pudo confirmar el pago" },
      { status: 502 }
    );
  }
}
