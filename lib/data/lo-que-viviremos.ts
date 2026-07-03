export interface Vivencia {
  id: string;
  titulo: string;
  subtitulo: string;
  imagen: string;
}

export const vivencias: Vivencia[] = [
  {
    id: "saltos-toboganes",
    titulo: "Saltos y Toboganes",
    subtitulo: "Charcos de Damajagua",
    imagen: "/images/toboganes.png",
  },
  {
    id: "playas-paradisiacas",
    titulo: "Playas paradisiacas",
    subtitulo: "Playa Frontón, Samaná",
    imagen: "/images/samana.JPG",
  },
  {
    id: "historia-patrimonio",
    titulo: "Historia y Patrimonio",
    subtitulo: "Zona Colonial, Santo Domingo",
    imagen: "/images/ZonaColonial-RandomTrips.jpg",
  },
  {
    id: "cultura-local",
    titulo: "Cultura Local",
    subtitulo: "Santo Domingo",
    imagen: "/images/santo-domingo-calle.jpg",
  },
  {
    id: "clases-surf",
    titulo: "Clases de Surf",
    subtitulo: "Playa Bonita, Samaná",
    imagen: "/images/rio-san-juan.png",
  },
  {
    id: "gastronomia-local",
    titulo: "Gastronomía Local",
    subtitulo: "Santo Domingo",
    imagen: "/images/mofongo.jpg",
  },
];
