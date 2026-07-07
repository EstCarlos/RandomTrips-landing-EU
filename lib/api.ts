const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

/**
 * URL del backend serverless (random-trips-backend-eu, API Gateway).
 * `path` es la ruta del endpoint: "/contacto", "/paypal/create-order", etc.
 */
export function apiUrl(path: string): string {
  if (!API_BASE) {
    throw new Error("Falta NEXT_PUBLIC_API_BASE en las variables de entorno");
  }

  return `${API_BASE.replace(/\/$/, "")}${path}`;
}
