import { apiUrl } from "@/lib/api";

/**
 * Galería de fotos por día desde el backend (GET /galeria): la Lambda lista
 * el bucket S3 (keys `galeria/<dia-id>/<foto>`) y devuelve URLs de CloudFront.
 * Para agregar fotos basta con subirlas al bucket:
 * `aws s3 sync public/images/galeria s3://<bucket>/galeria/`.
 *
 * Solo para Server Components; se revalida cada 5 minutos. Si el API falla
 * devuelve {} y el lightbox cae a la imagen principal de cada día.
 */
export async function getGalerias(): Promise<Record<string, string[]>> {
  try {
    const response = await fetch(apiUrl("/galeria"), {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`GET /galeria respondió ${response.status}`);
    }

    return (await response.json()) as Record<string, string[]>;
  } catch (error) {
    console.error("No se pudo cargar la galería:", error);
    return {};
  }
}
