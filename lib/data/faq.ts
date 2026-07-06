export type CategoriaFaq = {
  id: string;
  label: string;
  emoji: string;
};

export type PreguntaFrecuente = {
  id: string;
  categoria: string;
  pregunta: string;
  respuesta: string;
};

// Emojis según el diseño de Figma (excepción documentada en CLAUDE.md)
export const categoriasFaq: CategoriaFaq[] = [
  { id: "reserva-pagos", label: "Reserva y Pagos", emoji: "💳" },
  { id: "antes-viaje", label: "Antes del Viaje", emoji: "🧳" },
  { id: "durante", label: "Durante la Experiencia", emoji: "⭐" },
];

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    id: "condicion-fisica",
    categoria: "antes-viaje",
    pregunta: "¿Necesito estar en buena condición física?",
    respuesta:
      "No necesitas ser un atleta, pero sí tener una condición física básica para disfrutar caminatas, playas y actividades al aire libre.",
  },
  {
    id: "viajar-solo",
    categoria: "antes-viaje",
    pregunta: "¿Puedo viajar solo(a)?",
    respuesta:
      "¡Claro! De hecho, muchos de nuestros viajeros se unen solos. La experiencia está diseñada para conectar con personas que comparten la misma pasión por viajar.",
  },
  {
    id: "alojamientos",
    categoria: "durante",
    pregunta: "¿Cómo son los alojamientos?",
    respuesta:
      "Nos hospedaremos en hoteles cuidadosamente seleccionados por su comodidad, ubicación y experiencia. No buscamos el lujo tradicional, sino lugares que complementen la esencia del viaje.",
  },
  {
    id: "experiencia-surf",
    categoria: "durante",
    pregunta: "¿Necesito experiencia para la clase de surf?",
    respuesta:
      "No. La clase está pensada para principiantes y será impartida por instructores locales.",
  },
  {
    id: "transporte",
    categoria: "durante",
    pregunta: "¿Qué tipo de transporte utilizaremos?",
    respuesta:
      "Nos desplazaremos durante todo el recorrido en transporte privado y cómodo para el grupo.",
  },
  {
    id: "que-llevar",
    categoria: "antes-viaje",
    pregunta: "¿Qué debo llevar?",
    respuesta:
      "Ropa ligera, traje de baño, zapatos cómodos, protector solar, repelente, una botella reutilizable de agua y muchas ganas de vivir nuevas experiencias.",
  },
  {
    id: "exigencia",
    categoria: "antes-viaje",
    pregunta: "¿Este viaje es muy exigente?",
    respuesta:
      "No. Algunas actividades requieren caminar o realizar pequeños esfuerzos físicos, pero el itinerario está pensado para que cualquier persona con una condición física normal pueda disfrutarlo.",
  },
  {
    id: "comidas",
    categoria: "durante",
    pregunta: "¿Qué comidas están incluidas?",
    respuesta:
      "Las comidas incluidas aparecen especificadas en el apartado “¿Qué incluye?”. También tendremos oportunidades para probar la gastronomía local durante el recorrido.",
  },
  {
    id: "maleta",
    categoria: "antes-viaje",
    pregunta: "¿Puedo llevar una maleta grande?",
    respuesta:
      "Sí. Recomendamos una maleta cómoda y un bolso pequeño o mochila para las actividades diarias.",
  },
  {
    id: "lluvia",
    categoria: "durante",
    pregunta: "¿Qué pasa si llueve?",
    respuesta:
      "Algunas actividades pueden ajustarse por seguridad o condiciones climáticas. Siempre buscaremos la mejor alternativa para que disfrutes al máximo la experiencia.",
  },
  {
    id: "diferencial",
    categoria: "antes-viaje",
    pregunta: "¿Qué hace diferente este viaje?",
    respuesta:
      "No es un circuito turístico tradicional. Es una experiencia para descubrir la República Dominicana de una forma auténtica, compartiendo con la cultura local, explorando lugares increíbles y viajando junto a un grupo con intereses similares.",
  },
  {
    id: "tiempo-libre",
    categoria: "durante",
    pregunta: "¿Hay tiempo libre?",
    respuesta:
      "Sí. Aunque tendremos un itinerario organizado, también habrá momentos para descansar, explorar por tu cuenta o simplemente disfrutar del destino.",
  },
  {
    id: "reservar",
    categoria: "reserva-pagos",
    pregunta: "¿Cómo puedo reservar mi lugar?",
    respuesta:
      "Solo debes completar tu reserva con el depósito inicial. Una vez confirmada, recibirás toda la información necesaria para preparar tu viaje.",
  },
  {
    id: "cancelacion",
    categoria: "reserva-pagos",
    pregunta: "¿Qué pasa si necesito cancelar?",
    respuesta:
      "Te recomendamos revisar nuestras políticas de cancelación antes de reservar. Allí encontrarás toda la información sobre cambios, reembolsos y condiciones aplicables.",
  },
];
