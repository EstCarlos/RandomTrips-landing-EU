"use client";

import Link from "next/link";
import { calendarioCuotas, formatearPrecio, type Plan } from "@/lib/data/planes";
import { CheckIcon } from "@/components/shared/icons";

export function ReservaConfirmada({
  reservaId,
  plan,
}: {
  reservaId: string;
  plan?: Plan;
}) {
  return (
    <div className="reserva-paso mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-2xl md:p-12">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-amarillo text-azul">
        <CheckIcon className="size-8" />
      </span>

      <h2 className="mt-6 font-blur text-4xl leading-none text-azul md:text-5xl">
        ¡RESERVA CONFIRMADA!
      </h2>

      <p className="mt-4 font-montserrat text-base text-ink md:text-lg">
        Tu pago se procesó correctamente. En breve el equipo de Random Trips
        se pondrá en contacto contigo con los siguientes pasos.
      </p>

      {plan?.cuotas && (
        <p className="mt-4 rounded-2xl bg-black/5 p-4 font-montserrat text-sm leading-relaxed text-ink">
          Tu cupo quedó asegurado con la reserva. El saldo se completa en las
          fechas programadas:{" "}
          <strong className="font-bold">
            {calendarioCuotas(plan, 1)
              .map((cuota) => `${cuota.fecha}: ${formatearPrecio(cuota.monto)}`)
              .join(", ")}
          </strong>
          . Recibirás un link de pago por email para cada fecha.
        </p>
      )}

      <p className="mt-4 font-montserrat text-xs text-ink/50">
        Número de reserva: {reservaId}
      </p>

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-azul px-8 py-3 font-blur text-xl uppercase tracking-wide text-white shadow-md transition-transform duration-300 hover:scale-105"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
