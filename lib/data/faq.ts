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

// Preguntas y respuestas definidas por el socio (fuente: pregutnas.txt)
export const preguntasFrecuentes: PreguntaFrecuente[] = [
  // 💳 Reservas y pagos
  {
    id: "reservar",
    categoria: "reserva-pagos",
    pregunta: "¿Cómo puedo reservar mi lugar?",
    respuesta:
      "Completa el formulario de reserva y realiza el depósito inicial. Una vez confirmado el pago, tu cupo quedará asegurado y recibirás un email de confirmación; el equipo se contactará contigo para enviarte toda la información necesaria para prepararte para el viaje.",
  },
  {
    id: "metodos-pago",
    categoria: "reserva-pagos",
    pregunta: "¿Cuáles son los métodos de pago disponibles?",
    respuesta:
      "Aceptamos transferencias interbancarias, tarjetas de crédito y débito y otros métodos habilitados al momento de la reserva.",
  },
  {
    id: "pago-cuotas",
    categoria: "reserva-pagos",
    pregunta: "¿Puedo pagar en cuotas?",
    respuesta:
      "Sí. Contamos con diferentes planes en la sección “Modalidad de pago” para que elijas el que prefieras y completes el monto total antes de la fecha límite establecida.",
  },
  {
    id: "fecha-limite-pago",
    categoria: "reserva-pagos",
    pregunta: "¿Hasta cuándo puedo realizar el pago final?",
    // TODO: el socio aún no define la fecha límite de pago
    respuesta:
      "La fecha límite de pago es: [Fecha límite de pago]. (Se indicará la fecha específica en tu reserva.)",
  },
  {
    id: "cancelacion",
    categoria: "reserva-pagos",
    pregunta: "¿Qué sucede si necesito cancelar mi reserva?",
    respuesta:
      "Las cancelaciones se rigen por nuestras políticas de cancelación. Te recomendamos revisarlas antes de confirmar tu reserva.",
  },
  {
    id: "transferir-cupo",
    categoria: "reserva-pagos",
    pregunta: "¿Puedo transferir mi cupo a otra persona?",
    respuesta:
      "Sí, siempre que se notifique con suficiente anticipación y la persona reemplazo cumpla con los requisitos del viaje.",
  },
  {
    id: "que-incluye-precio",
    categoria: "reserva-pagos",
    pregunta: "¿Qué incluye el precio del viaje?",
    respuesta:
      "El detalle completo de los servicios incluidos está en la sección “¿Qué incluye?”, donde podrás conocer todo lo que forma parte de la experiencia.",
  },
  {
    id: "que-no-incluye-precio",
    categoria: "reserva-pagos",
    pregunta: "¿Qué no está incluido en el precio?",
    respuesta:
      "Los servicios no incluidos están especificados en la sección “¿Qué no incluye?” para que puedas planificar tu viaje con total transparencia.",
  },

  // 🧳 Antes del viaje
  {
    id: "documentos",
    categoria: "antes-viaje",
    pregunta: "¿Qué documentos necesito para viajar?",
    respuesta:
      "Necesitarás pasaporte o documento de identidad válido según los requisitos de tu país y completar el E-Ticket de migración dominicana. En el grupo compartiremos más detalles y asistencia.",
  },
  {
    id: "traslado-aeropuerto",
    categoria: "antes-viaje",
    pregunta: "¿El traslado desde el aeropuerto está incluido?",
    respuesta:
      "Sí. Incluimos el traslado de llegada y salida entre el aeropuerto y el alojamiento.",
  },
  {
    id: "hospedaje",
    categoria: "antes-viaje",
    pregunta: "¿Dónde nos hospedaremos?",
    respuesta:
      "Nos alojaremos en apartamentos y villas cuidadosamente seleccionadas por su comodidad, ubicación y excelente relación calidad-experiencia.",
  },
  {
    id: "habitaciones",
    categoria: "antes-viaje",
    pregunta: "¿Cómo serán las habitaciones?",
    respuesta:
      "Habitaciones compartidas, con ropa de cama, limpieza periódica básica y comodidades esenciales.",
  },
  {
    id: "que-llevar",
    categoria: "antes-viaje",
    pregunta: "¿Qué debo llevar al viaje?",
    respuesta:
      "Ropa ligera, traje de baño, calzado cómodo, protector solar, repelente, gorra y muchas ganas de vivir una gran aventura.",
  },
  {
    id: "viajar-solo",
    categoria: "antes-viaje",
    pregunta: "¿Puedo viajar solo(a)?",
    respuesta:
      "¡Claro! Muchos viajeros vienen solos. Es una excelente oportunidad para conocer personas con la misma energía y pasión por viajar.",
  },
  {
    id: "seguro-viaje",
    categoria: "antes-viaje",
    pregunta: "¿Necesito contratar un seguro de viaje?",
    respuesta:
      "No es obligatorio, pero recomendamos contar con un seguro que cubra asistencia médica e imprevistos. Si lo deseas, ofrecemos opciones de seguro de viaje local con cobertura durante toda la experiencia.",
  },
  {
    id: "informacion-previa",
    categoria: "antes-viaje",
    pregunta: "¿Cómo recibiré toda la información antes de la salida?",
    respuesta:
      "Semanas antes del viaje recibirás más información detallada y asistencia para resolver cualquier duda.",
  },

  // 🌴 Durante la experiencia
  {
    id: "condicion-fisica",
    categoria: "durante",
    pregunta: "¿Necesito una buena condición física para participar?",
    respuesta:
      "Solo se requiere una condición física básica para disfrutar caminatas cortas, playas y actividades al aire libre.",
  },
  {
    id: "saber-nadar",
    categoria: "durante",
    pregunta: "¿Necesito saber nadar?",
    respuesta:
      "No es obligatorio. Contaremos con chalecos en transportes en bote; sin embargo, saber nadar es recomendable para disfrutar con mayor tranquilidad algunas actividades acuáticas.",
  },
  {
    id: "experiencia-surf",
    categoria: "durante",
    pregunta: "¿Necesito experiencia previa para la clase de surf?",
    respuesta:
      "No. La clase está diseñada tanto para principiantes como para quienes ya tienen experiencia y será impartida por instructores certificados.",
  },
  {
    id: "comidas",
    categoria: "durante",
    pregunta: "¿Qué tipo de comidas están incluidas?",
    respuesta:
      "Las comidas incluidas están especificadas en la sección “¿Qué incluye?” del viaje.",
  },
  {
    id: "tiempo-libre",
    categoria: "durante",
    pregunta: "¿Tendremos tiempo libre durante el viaje?",
    respuesta:
      "Sí. El itinerario contempla días y momentos para descanso y tiempo libre.",
  },
  {
    id: "clima",
    categoria: "durante",
    pregunta: "¿Qué pasa si el clima no permite realizar alguna actividad?",
    respuesta:
      "Si las condiciones climáticas afectan una actividad, buscaremos alternativas que garanticen seguridad y la mejor experiencia posible.",
  },
  {
    id: "diferencial",
    categoria: "durante",
    pregunta: "¿Qué hace diferente esta experiencia de un tour tradicional?",
    respuesta:
      "No es un viaje para ver lugares desde un autobús: está diseñado para conectar con la cultura local, descubrir rincones auténticos y compartir con un grupo de viajeros que buscan vivir la República Dominicana desde una perspectiva diferente.",
  },
  {
    id: "tipo-viajeros",
    categoria: "durante",
    pregunta: "¿Qué tipo de viajeros participan en este viaje?",
    respuesta:
      "Personas abiertas a conocer gente nueva, salir de su zona de confort y vivir experiencias auténticas. No importa si viajas solo o acompañado; lo importante es tener ganas de explorar y conectar con el destino.",
  },
];
