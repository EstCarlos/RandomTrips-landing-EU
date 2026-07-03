export interface DiaItinerario {
  id: string;
  dia: string;
  titulo: string;
  imagen: string;
  descripcion: string;
}

export const itinerario: DiaItinerario[] = [
  {
    id: "dia-1",
    dia: "DIA 1",
    titulo: "Llegada a Santo Domingo",
    imagen: "/images/santo-domingo.jpg",
    descripcion:
      "Bienvenidos a República Dominicana. Tras la llegada al aeropuerto, nos trasladaremos al hotel para instalarnos y comenzar esta aventura recorriendo algunos de los rincones más espectaculares del país. El personal de Random Trips lo estará esperando con un cartel con el nombre de la agencia, esta persona lo llevará en auto privado hasta su respectivo alojamiento.",
  },
  {
    id: "dia-2",
    dia: "DIA 2",
    titulo: "Puerto Plata",
    imagen: "/images/toboganes.png",
    descripcion:
      "Viviremos una aventura entre cascadas, toboganes naturales y pozas de agua color esmeralda en los Charcos de Damajagua. Después disfrutaremos de un almuerzo típico dominicano y recorreremos el centro histórico de Puerto Plata, visitando la famosa Calle de las Sombrillas, el Parque Central y el Paseo de Doña Rosa.",
  },
  {
    id: "dia-3",
    dia: "DIA 3",
    titulo: "Río San Juan",
    imagen: "/images/rio-san-juan.png",
    descripcion:
      "Descubriremos uno de los pueblos costeros más encantadores del norte del país. Recorreremos la colorida Calle Beller, navegaremos por la Laguna Gri Gri para conocer la Cueva de las Golondrinas, la Piscina Natural y Playa Gri Gri. Continuaremos explorando Playa Caletón, Playa Grande y finalizaremos el día disfrutando de un inolvidable atardecer frente al mar.",
  },
  {
    id: "dia-4",
    dia: "DIA 4",
    titulo: "Playa Frontón",
    imagen: "/images/samana.JPG",
    descripcion:
      "Nos embarcaremos rumbo a Playa Madama y la Cueva Taína antes de llegar a la espectacular Playa Frontón, donde disfrutaremos de un almuerzo típico caribeño. Finalizaremos el recorrido visitando Playa Bonita, uno de los rincones más icónicos de Las Terrenas.",
  },
  {
    id: "dia-5",
    dia: "DIA 5",
    titulo: "Playa Bonita, Playa Cosón y Clase de Surf",
    imagen: "/images/rio-san-juan.png",
    descripcion:
      "Disfrutaremos de un día entre las paradisíacas Playa Bonita y Playa Cosón, donde podremos relajarnos, nadar y disfrutar del Caribe. Además, viviremos la experiencia de una clase de surf guiada por instructores locales, ideal para principiantes y amantes del mar.",
  },
  {
    id: "dia-6",
    dia: "DIA 6",
    titulo: "Santo Domingo",
    imagen: "/images/ZonaColonial-RandomTrips.jpg",
    descripcion:
      "Recorreremos la primera ciudad del Nuevo Mundo explorando la histórica Zona Colonial, donde conoceremos la Catedral Primada de América, el Alcázar de Colón, la Fortaleza Ozama, el Paseo de las Damas y el Museo del Chocolate. Luego visitaremos el imponente Faro a Colón y finalizamos el día en el impresionante Parque Los Tres Ojos, un tesoro natural de aguas cristalinas.",
  },
  {
    id: "dia-7",
    dia: "DIA 7",
    titulo: "Sur Profundo - Barahona y Pedernales",
    imagen: "/images/pedernales.jpg",
    descripcion:
      "Descubriremos algunos de los paisajes más impresionantes del sur dominicano visitando Playa y Río San Rafael, Los Patos, el Mirador San Rafael, Arroyo Salado y los espectaculares Pozos de Romeo. Terminaremos el día descansando en un exclusivo glamping frente al mar en Cabo Rojo, Pedernales.",
  },
  {
    id: "dia-8",
    dia: "DIA 8",
    titulo: "Bahía de las Águilas",
    imagen: "/images/Bahia- 1.jpg",
    descripcion:
      "Visitaremos la encantadora Playita del Amor y navegaremos hasta Bahía de las Águilas, considerada una de las playas más hermosas del Caribe por sus aguas cristalinas y su entorno completamente virgen. Cerraremos la experiencia disfrutando de un delicioso almuerzo típico de la región antes de regresar a Santo Domingo.",
  },
  {
    id: "dia-9",
    dia: "DIA 9",
    titulo: "Fin de la aventura",
    imagen: "/images/santo-domingo-calle.jpg",
    descripcion:
      "Llegó el momento de despedirnos de esta increíble experiencia. Realizaremos el traslado desde el hotel hacia el aeropuerto, llevando con nosotros recuerdos inolvidables, nuevas amistades y la satisfacción de haber descubierto lo mejor de República Dominicana.",
  },
];
