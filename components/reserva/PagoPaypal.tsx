"use client";

import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";

type ContactoReserva = {
  nombreCompleto: string;
  email: string;
  telefono: string;
};

export function PagoPaypal({
  planId,
  viajeros,
  contacto,
  onSuccess,
}: {
  planId: string;
  viajeros: string[];
  contacto: ContactoReserva;
  onSuccess: (reservaId: string) => void;
}) {
  const [error, setError] = useState("");
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return (
      <p className="font-montserrat text-sm text-rojo-principal">
        Falta configurar NEXT_PUBLIC_PAYPAL_CLIENT_ID.
      </p>
    );
  }

  return (
    <div>
      <PayPalScriptProvider
        options={{ clientId, currency: "USD", intent: "capture" }}
      >
        <PayPalButtons
          style={{ layout: "vertical", label: "pay" }}
          createOrder={async () => {
            setError("");
            const response = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ planId, viajeros }),
            });

            if (!response.ok) {
              const body = await response.json().catch(() => ({}));
              throw new Error(body.error ?? "No se pudo crear la orden");
            }

            const data = await response.json();
            return data.id as string;
          }}
          onApprove={async (data) => {
            const response = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: data.orderID,
                planId,
                viajeros,
                contacto,
              }),
            });

            if (!response.ok) {
              const body = await response.json().catch(() => ({}));
              setError(body.error ?? "No se pudo confirmar el pago");
              return;
            }

            const body = await response.json();
            onSuccess(body.reservaId as string);
          }}
          onError={(err) => {
            console.error(err);
            setError("Ocurrió un error con PayPal. Intenta de nuevo.");
          }}
          onCancel={() => {
            setError("Pago cancelado.");
          }}
        />
      </PayPalScriptProvider>

      {error && (
        <p className="mt-3 font-montserrat text-sm text-rojo-principal">
          {error}
        </p>
      )}
    </div>
  );
}
