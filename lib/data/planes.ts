export type Plan = {
  id: string;
  nombre: string;
  precioPorPersona: number;
  destacado?: boolean;
  incluye: string[];
};

// TODO: precios y contenido reales — placeholders hasta que Random Trips los confirme.
export const planes: Plan[] = [
  {
    id: "plan-1",
    nombre: "Plan 1",
    precioPorPersona: 899,
    incluye: [
      "Alojamiento compartido",
      "Transporte durante todo el recorrido",
      "Actividades del itinerario",
    ],
  },
  {
    id: "plan-2",
    nombre: "Plan 2",
    precioPorPersona: 1199,
    destacado: true,
    incluye: [
      "Alojamiento privado",
      "Transporte durante todo el recorrido",
      "Actividades del itinerario",
      "Clase de surf",
    ],
  },
  {
    id: "plan-3",
    nombre: "Plan 3",
    precioPorPersona: 1499,
    incluye: [
      "Alojamiento privado premium",
      "Transporte durante todo el recorrido",
      "Actividades del itinerario",
      "Clase de surf",
      "Degustaciones gastronómicas",
    ],
  },
];

export function getPlanById(id: string): Plan | undefined {
  return planes.find((plan) => plan.id === id);
}
