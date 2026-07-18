export type PagoProgramado = {
  fecha: string;
  monto: number;
};

export type Plan = {
  id: string;
  nombre: string;
  precioPorPersona: number;
  /** Deposito inicial en EUR, solo en planes con pagos programados */
  reserva?: number;
  /** Saldo restante tras la reserva, en EUR */
  saldo?: number;
  /** Pagos pendientes despues de la reserva */
  cuotas?: {
    pagos: PagoProgramado[];
  };
  /** Texto del pill amarillo sobre la card, p. ej. "Mejor Precio" */
  badge?: string;
  /** Card resaltada con fondo azul */
  destacado?: boolean;
  /** Card mas alta que las demas, alineada por abajo */
  grande?: boolean;
  incluye: string[];
};

export const FECHA_VIAJE =
  "Sábado 26 de septiembre – Domingo 4 de octubre";

export const FECHA_RESERVA = "30 julio";

export const planes: Plan[] = [
  {
    id: "plan-1",
    nombre: "Plan 1",
    badge: "Mejor Precio",
    precioPorPersona: 1124,
    incluye: [
      "Pago completo al reservar.",
      "Reserva confirmada inmediatamente.",
      "El mejor precio disponible.",
    ],
  },
  {
    id: "plan-2",
    nombre: "Plan 2",
    grande: true,
    precioPorPersona: 1194,
    reserva: 200,
    saldo: 994,
    cuotas: {
      pagos: [
        { fecha: "12 agosto", monto: 332 },
        { fecha: "26 agosto", monto: 332 },
        { fecha: "9 septiembre", monto: 330 },
      ],
    },
    incluye: ["Reserva inicial y tres pagos programados."],
  },
  {
    id: "plan-3",
    nombre: "Plan 3",
    badge: "Mayor Flexibilidad",
    destacado: true,
    precioPorPersona: 1274,
    reserva: 200,
    saldo: 1074,
    cuotas: {
      pagos: [
        { fecha: "12 agosto", monto: 215 },
        { fecha: "26 agosto", monto: 215 },
        { fecha: "2 septiembre", monto: 215 },
        { fecha: "9 septiembre", monto: 215 },
        { fecha: "16 septiembre", monto: 214 },
      ],
    },
    incluye: ["Reserva inicial y pagos mas pequeños hasta completar el viaje."],
  },
];

export const infoPago: string[] = [
  `Fecha de viaje: ${FECHA_VIAJE}.`,
  `La reserva se realiza el ${FECHA_RESERVA} con el monto indicado en cada plan.`,
  "Puedes adelantar pagos o completar el saldo en cualquier momento antes de la última fecha programada.",
  "Los planes con mayor cantidad de pagos tienen un precio diferente debido a la flexibilidad que ofrecen.",
];

export function formatearEuro(monto: number): string {
  return `${monto.toLocaleString("es-ES", {
    minimumFractionDigits: monto % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })} €`;
}

export function getPlanById(id: string): Plan | undefined {
  return planes.find((plan) => plan.id === id);
}

/**
 * Lo que se cobra HOY en el checkout, en EUR: el total en planes de pago
 * unico, o el deposito de reserva (por persona) en planes con cuotas.
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
  /** Monto de la cuota en EUR por persona */
  montoPorPersona: number;
  fecha: string;
};

export function calendarioCuotas(
  plan: Plan,
  cantidadViajeros: number
): CuotaProgramada[] {
  if (!plan.cuotas) {
    return [];
  }

  return plan.cuotas.pagos.map((pago, index) => ({
    numero: index + 1,
    monto: pago.monto * cantidadViajeros,
    montoPorPersona: pago.monto,
    fecha: pago.fecha,
  }));
}
