import { NextResponse } from "next/server";
import { createOrder } from "@/lib/paypal/client";
import { getPlanById } from "@/lib/data/planes";

export async function POST(request: Request) {
  const body = await request.json();
  const { planId, viajeros } = body as { planId?: string; viajeros?: string[] };

  if (!planId || !getPlanById(planId)) {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }

  if (!Array.isArray(viajeros) || viajeros.length === 0) {
    return NextResponse.json(
      { error: "Debe haber al menos un viajero" },
      { status: 400 }
    );
  }

  if (viajeros.some((nombre) => typeof nombre !== "string" || !nombre.trim())) {
    return NextResponse.json(
      { error: "Todos los viajeros deben tener nombre" },
      { status: 400 }
    );
  }

  try {
    const order = await createOrder(planId, viajeros.length);
    return NextResponse.json({ id: order.id });
  } catch (error) {
    console.error("Error creando orden de PayPal", error);
    return NextResponse.json(
      { error: "No se pudo crear la orden de PayPal" },
      { status: 502 }
    );
  }
}
