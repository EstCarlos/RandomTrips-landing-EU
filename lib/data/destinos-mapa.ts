import { mediaUrl } from "@/lib/media";

export interface DestinoMapa {
  id: string;
  nombre: string;
  imagen: string;
  fotoPos: { top: string; left: string };
  pinPos: { top: string; left: string };
  // tamaño y proporción individuales de cada foto según el Figma
  // (unas más grandes que otras, la mayoría en orientación vertical)
  fotoAncho: string;
  fotoAspecto: string;
}

export const destinosMapa: DestinoMapa[] = [
  {
    id: "puerto-plata",
    nombre: "PUERTO PLATA",
    imagen: mediaUrl("landing/puerto-plata.png"),
    fotoPos: { top: "12%", left: "13%" },
    pinPos: { top: "9%", left: "31%" },
    fotoAncho: "w-28 md:w-32 lg:w-40",
    fotoAspecto: "aspect-[4/5]",
  },
  {
    id: "rio-san-juan",
    nombre: "RÍO SAN JUAN",
    imagen: mediaUrl("landing/rio-san-juan.png"),
    fotoPos: { top: "9%", left: "61%" },
    pinPos: { top: "19%", left: "49%" },
    fotoAncho: "w-16 md:w-20 lg:w-24",
    fotoAspecto: "aspect-[5/4]",
  },
  {
    id: "samana",
    nombre: "SAMANÁ",
    imagen: mediaUrl("landing/samana.JPG"),
    fotoPos: { top: "30%", left: "87%" },
    pinPos: { top: "29%", left: "71%" },
    fotoAncho: "w-20 md:w-24 lg:w-28",
    fotoAspecto: "aspect-[5/6]",
  },
  {
    id: "santo-domingo",
    nombre: "SANTO DOMINGO",
    imagen: mediaUrl("landing/santo-domingo.jpg"),
    fotoPos: { top: "43%", left: "45%" },
    pinPos: { top: "63%", left: "56%" },
    fotoAncho: "w-24 md:w-28 lg:w-36",
    fotoAspecto: "aspect-[4/5]",
  },
  {
    id: "pedernales",
    nombre: "PEDERNALES",
    imagen: mediaUrl("landing/pedernales.jpg"),
    fotoPos: { top: "50%", left: "10%" },
    pinPos: { top: "89%", left: "14%" },
    fotoAncho: "w-20 md:w-24 lg:w-28",
    fotoAspecto: "aspect-[4/5]",
  },
  {
    id: "barahona",
    nombre: "BARAHONA",
    imagen: mediaUrl("landing/barahona.jpg"),
    fotoPos: { top: "79%", left: "32%" },
    pinPos: { top: "86%", left: "20%" },
    fotoAncho: "w-14 md:w-16 lg:w-20",
    fotoAspecto: "aspect-[3/4]",
  },
];
