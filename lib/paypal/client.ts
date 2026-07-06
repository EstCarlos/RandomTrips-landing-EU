import { getPlanById } from "@/lib/data/planes";

const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE ?? "https://api-m.sandbox.paypal.com";

function getCredentials() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Faltan PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET en las variables de entorno."
    );
  }

  return { clientId, clientSecret };
}

async function getAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getCredentials();
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`No se pudo obtener el token de PayPal (${response.status})`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

export function calcularTotal(planId: string, cantidadViajeros: number): number {
  const plan = getPlanById(planId);

  if (!plan) {
    throw new Error(`Plan desconocido: ${planId}`);
  }

  if (!Number.isInteger(cantidadViajeros) || cantidadViajeros < 1) {
    throw new Error("La cantidad de viajeros debe ser un entero mayor o igual a 1");
  }

  return plan.precioPorPersona * cantidadViajeros;
}

export async function createOrder(planId: string, cantidadViajeros: number) {
  const plan = getPlanById(planId);

  if (!plan) {
    throw new Error(`Plan desconocido: ${planId}`);
  }

  const total = calcularTotal(planId, cantidadViajeros);
  const accessToken = await getAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: `Random Trips — ${plan.nombre} x ${cantidadViajeros} viajero(s)`,
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
          },
        },
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Error creando la orden de PayPal (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { id: string };
  return data;
}

export async function captureOrder(orderId: string) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Error capturando la orden de PayPal (${response.status}): ${body}`);
  }

  return (await response.json()) as {
    id: string;
    status: string;
    purchase_units: Array<{
      payments?: {
        captures?: Array<{ amount: { value: string; currency_code: string } }>;
      };
    }>;
  };
}
