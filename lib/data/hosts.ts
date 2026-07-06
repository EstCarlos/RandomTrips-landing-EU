export type Host = {
  id: string;
  nombre: [string, string];
  rol: string;
  foto: string;
};

export const hosts: Host[] = [
  {
    id: "bernat",
    nombre: ["Bernat", "Moreno"],
    rol: "Host / Creador",
    foto: "/images/bernat.JPG",
  },
  {
    id: "randy",
    nombre: ["Randy", "García"],
    rol: "Staff Random Trips",
    foto: "/images/randy.jpg",
  },
];

export const bioHosts = [
  "Soy Bernat, y viajar es lo que me mueve.",
  "Barcelona es mi base, pero rara vez estoy quieto. Me gusta perderme por rutas que no salen en las guías, hablar con gente local, dormir en sitios donde no sabes muy bien qué esperar al día siguiente. Para mí un viaje bueno no es el que sale perfecto, es el que te deja una historia que contar.",
  "He recorrido carreteras en moto por el Sudeste Asiático, me he metido en fiordos noruegos en pleno invierno, y este año fui a RD en busca de las mejores aventuras. Me fui con ganas de más, así que ya sé que vuelvo.",
  "La logística y coordinación del viaje estarán a cargo de Random Trips, para que solo te preocupes por disfrutar. Nos encargamos de cada detalle para ofrecerte una experiencia auténtica, cercana y diferente, descubriendo la República Dominicana desde una perspectiva local.",
];
