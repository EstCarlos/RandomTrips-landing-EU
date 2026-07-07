const CDN_DOMAIN = process.env.NEXT_PUBLIC_MEDIA_CDN_DOMAIN;

/**
 * URL de CloudFront para un archivo del bucket de media (random-trips-backend-eu).
 * `key` es la ruta dentro del bucket: "landing/foo.png" o "galeria/dia-1/foto.jpg".
 */
export function mediaUrl(key: string): string {
  if (!CDN_DOMAIN) {
    throw new Error("Falta NEXT_PUBLIC_MEDIA_CDN_DOMAIN en las variables de entorno");
  }

  return `https://${CDN_DOMAIN}/${encodeURI(key)}`;
}
