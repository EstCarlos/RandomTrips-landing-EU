export type Plan = {
  id: string;
  nombre: string;
  precioPorPersona: number;
  /** Depósito inicial en EUR — solo en planes con cuotas */
  reserva?: number;
  /** Saldo restante tras la reserva, en EUR — solo en planes con cuotas */
  saldo?: number;
  /** Cuotas mensuales en EUR que cubren el saldo (se cobran por link de pago) */
  cuotas?: {
    cantidad: number;
    monto: number;
  };
  /** Texto del pill amarillo sobre la card, p. ej. "Mejor Precio" */
  badge?: string;
  /** Card resaltada con fondo azul (Plan 3 — mayor flexibilidad) */
  destacado?: boolean;
  /** Card más alta que las demás, alineada por abajo (Plan 2) */
  grande?: boolean;
  incluye: string[];
};

export const planes: Plan[] = [
  {
    id: "plan-1",
    nombre: "Plan 1",
    badge: "Mejor Precio",
    precioPorPersona: 1032,
    incluye: [
      "Un solo pago",
      "Reserva confirmada inmediatamente",
      "El mejor precio disponible.",
    ],
  },
  {
    id: "plan-2",
    nombre: "Plan 2",
    grande: true,
    precioPorPersona: 1132,
    reserva: 200,
    saldo: 932,
    cuotas: { cantidad: 3, monto: 310.67 },
    incluye: ["Más flexibilidad para organizar tus pagos."],
  },
  {
    id: "plan-3",
    nombre: "Plan 3",
    badge: "Mayor Flexibilidad",
    destacado: true,
    precioPorPersona: 1182,
    reserva: 200,
    saldo: 982,
    cuotas: { cantidad: 5, monto: 196.4 },
    incluye: ["La opción ideal si prefieres realizar pagos más pequeños."],
  },
];

export const infoPago: string[] = [
  "El depósito inicial garantiza tu lugar en la experiencia.",
  "Puedes adelantar cuotas o completar el pago en cualquier momento antes de la fecha límite.",
  "Todos los pagos deben estar completados antes de la fecha límite de pago del viaje.",
  "Los planes con mayor cantidad de cuotas tienen un precio diferente debido a la flexibilidad que ofrecen.",
];

export function getPlanById(id: string): Plan | undefined {
  return planes.find((plan) => plan.id === id);
}

/**
 * Lo que se cobra HOY en el checkout, en EUR: el total en planes de pago
 * único, o el depósito de reserva (por persona) en planes con cuotas.
 * Debe coincidir con calcularPagoInicial del backend (random-trips-backend-eu),
 * que es quien crea la orden PayPal con el monto real.
 */
export function calcularPagoInicial(plan: Plan, cantidadViajeros: number): number {
  return (plan.reserva ?? plan.precioPorPersona) * cantidadViajeros;
}

export type CuotaProgramada = {
  numero: number;
  /** Monto de la cuota en EUR para todos los viajeros */
  monto: number;
  fecha: Date;
};

/**
 * Calendario estimado de cuotas mensuales: la primera un mes después de la
 * reserva y así sucesivamente. Cada cuota se cobra con un link de pago que
 * envía el equipo, por lo que las fechas son orientativas.
 */
export function calendarioCuotas(
  plan: Plan,
  cantidadViajeros: number,
  desde: Date = new Date()
): CuotaProgramada[] {
  if (!plan.cuotas) {
    return [];
  }

  return Array.from({ length: plan.cuotas.cantidad }, (_, i) => {
    const fecha = new Date(desde);
    fecha.setMonth(fecha.getMonth() + i + 1);

    return {
      numero: i + 1,
      monto: plan.cuotas!.monto * cantidadViajeros,
      fecha,
    };
  });
}
