import { readdirSync } from "fs";
import path from "path";
import { itinerario } from "@/lib/data/itinerario";
import { mediaUrl } from "@/lib/media";

const EXTENSIONES = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Detecta qué fotos tiene cada día leyendo /public/images/galeria/<dia-id>/
 * (solo puede usarse en Server Components, usa fs), pero genera URLs del CDN
 * (mismo key en el bucket S3). Al agregar fotos localmente hay que subirlas
 * también con `aws s3 sync public/images/galeria s3://<bucket>/galeria/`
 * para que la URL generada exista de verdad.
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
        .map((archivo) => mediaUrl(`galeria/${dia.id}/${archivo}`));
    } catch {
      galerias[dia.id] = [];
    }
  }

  return galerias;
}
