"use client";

import { FECHA_RESERVA, formatearEuro, planes } from "@/lib/data/planes";
import { CheckIcon } from "@/components/shared/icons";

export function PlanSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (planId: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {planes.map((plan) => {
        const selected = plan.id === value;

        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onChange(plan.id)}
            aria-pressed={selected}
            className={`relative flex flex-col rounded-3xl border-2 p-5 text-left shadow-md transition-all duration-200 ${
              selected
                ? "border-azul bg-azul text-white"
                : "border-black/10 bg-white text-azul hover:border-azul/40"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-5 rounded-full bg-amarillo px-3 py-1 font-montserrat text-xs font-bold uppercase text-azul">
                {plan.badge}
              </span>
            )}

            <h3 className="font-blur text-3xl leading-none">{plan.nombre}</h3>
            <p className="mt-2 font-montserrat text-2xl font-bold">
              {formatearEuro(plan.precioPorPersona)}
              <span className="ml-1 text-sm font-medium opacity-80">
                / persona
              </span>
            </p>

            {plan.reserva !== undefined && plan.saldo !== undefined && (
              <p className="mt-1 font-montserrat text-xs font-medium opacity-80">
                Reserva {formatearEuro(plan.reserva)} · Saldo{" "}
                {formatearEuro(plan.saldo)}
              </p>
            )}

            {plan.cuotas && (
              <p className="mt-1 font-montserrat text-xs font-bold">
                Pagos programados desde el {FECHA_RESERVA}
              </p>
            )}

            <ul className="mt-4 space-y-2">
              {plan.incluye.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${
                      selected ? "bg-white/20 text-white" : "bg-azul/10 text-azul"
                    }`}
                    aria-hidden
                  >
                    <CheckIcon className="size-2.5" />
                  </span>
                  <span className="font-montserrat text-sm leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </button>
        );
      })}
    </div>
  );
}
