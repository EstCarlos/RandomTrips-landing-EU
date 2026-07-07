import { mediaUrl } from "@/lib/media";

export interface DestinoMapa {
  id: string;
  nombre: string;
  imagen: string;
  fotoPos: { top: string; left: string };
  pinPos: { top: string; left: string };
}

export const destinosMapa: DestinoMapa[] = [
  {
    id: "puerto-plata",
    nombre: "PUERTO PLATA",
    imagen: mediaUrl("landing/puerto-plata.png"),
    fotoPos: { top: "12%", left: "13%" },
    pinPos: { top: "9%", left: "31%" },
  },
  {
    id: "rio-san-juan",
    nombre: "RÍO SAN JUAN",
    imagen: mediaUrl("landing/rio-san-juan.png"),
    fotoPos: { top: "9%", left: "61%" },
    pinPos: { top: "19%", left: "49%" },
  },
  {
    id: "samana",
    nombre: "SAMANÁ",
    imagen: mediaUrl("landing/samana.JPG"),
    fotoPos: { top: "30%", left: "87%" },
    pinPos: { top: "29%", left: "71%" },
  },
  {
    id: "santo-domingo",
    nombre: "SANTO DOMINGO",
    imagen: mediaUrl("landing/santo-domingo.jpg"),
    fotoPos: { top: "43%", left: "45%" },
    pinPos: { top: "63%", left: "56%" },
  },
  {
    id: "pedernales",
    nombre: "PEDERNALES",
    imagen: mediaUrl("landing/pedernales.jpg"),
    fotoPos: { top: "50%", left: "10%" },
    pinPos: { top: "89%", left: "14%" },
  },
  {
    id: "barahona",
    nombre: "BARAHONA",
    imagen: mediaUrl("landing/barahona.jpg"),
    fotoPos: { top: "79%", left: "32%" },
    pinPos: { top: "86%", left: "20%" },
  },
];
