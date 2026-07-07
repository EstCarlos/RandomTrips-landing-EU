import { readdirSync } from "fs";
import path from "path";
import { itinerario } from "@/lib/data/itinerario";

const EXTENSIONES = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Lee las fotos de cada día desde /public/images/galeria/<dia-id>/.
 * Solo puede usarse en Server Components (usa fs). Basta con soltar las
 * fotos en la carpeta del día para que aparezcan en el carrusel.
 */
export function getGalerias(): Record<string, string[]> {
  const galerias: Record<string, string[]> = {};

  for (const dia of itinerario) {
    const dir = path.join(process.cwd(), "public", "images", "galeria", dia.id);

    try {
      galerias[dia.id] = readdirSync(dir)
        .filter((archivo) =>
          EXTENSIONES.has(path.extname(archivo).toLowerCase())
        )
        .sort()
        .map(
          (archivo) =>
            `/images/galeria/${dia.id}/${encodeURIComponent(archivo)}`
        );
    } catch {
      galerias[dia.id] = [];
    }
  }

  return galerias;
}
