"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { planes } from "@/lib/data/planes";
import { PlanSelector } from "@/components/reserva/PlanSelector";
import { ViajerosForm } from "@/components/reserva/ViajerosForm";
import { PagoPaypal } from "@/components/reserva/PagoPaypal";
import { ReservaConfirmada } from "@/components/reserva/ReservaConfirmada";

type Paso = "formulario" | "pago" | "exito";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ReservaFlow() {
  const container = useRef<HTMLDivElement>(null);
  const [paso, setPaso] = useState<Paso>("formulario");
  const [planId, setPlanId] = useState(planes[0]?.id ?? "");
  const [viajeros, setViajeros] = useState<string[]>([""]);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [erroresViajeros, setErroresViajeros] = useState<Record<number, string>>({});
  const [reservaId, setReservaId] = useState("");

  const plan = planes.find((p) => p.id === planId);
  const total = plan ? plan.precioPorPersona * viajeros.length : 0;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".reserva-paso",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      });
      return () => mm.revert();
    },
    { scope: container, dependencies: [paso] }
  );

  function validarFormulario() {
    const nuevosErrores: Record<string, string> = {};
    const nuevosErroresViajeros: Record<number, string> = {};

    if (!nombreCompleto.trim()) {
      nuevosErrores.nombreCompleto = "Ingresa tu nombre completo";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      nuevosErrores.email = "Ingresa un email válido";
    }
    if (!telefono.trim()) {
      nuevosErrores.telefono = "Ingresa un teléfono de contacto";
    }
    if (!plan) {
      nuevosErrores.plan = "Selecciona un plan";
    }

    viajeros.forEach((nombre, index) => {
      if (!nombre.trim()) {
        nuevosErroresViajeros[index] = "Falta el nombre de este viajero";
      }
    });

    setErrores(nuevosErrores);
    setErroresViajeros(nuevosErroresViajeros);

    return (
      Object.keys(nuevosErrores).length === 0 &&
      Object.keys(nuevosErroresViajeros).length === 0
    );
  }

  function handleSubmitFormulario(event: React.FormEvent) {
    event.preventDefault();
    if (validarFormulario()) {
      setPaso("pago");
    }
  }

  return (
    <div ref={container}>
      {paso === "formulario" && (
        <form
          onSubmit={handleSubmitFormulario}
          className="reserva-paso mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-2xl md:p-10"
        >
          <h2 className="font-blur text-3xl leading-none text-azul md:text-4xl">
            Elige tu plan
          </h2>
          {errores.plan && (
            <p className="mt-1 font-montserrat text-sm text-rojo-principal">
              {errores.plan}
            </p>
          )}
          <div className="mt-4">
            <PlanSelector value={planId} onChange={setPlanId} />
          </div>

          <hr className="my-8 border-black/10" />

          <h2 className="font-blur text-3xl leading-none text-azul md:text-4xl">
            Viajeros
          </h2>
          <div className="mt-4">
            <ViajerosForm
              viajeros={viajeros}
              onChange={setViajeros}
              errors={erroresViajeros}
            />
          </div>

          <hr className="my-8 border-black/10" />

          <h2 className="font-blur text-3xl leading-none text-azul md:text-4xl">
            Datos del titular
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block font-montserrat text-sm font-medium text-azul/80">
                Nombre completo
              </label>
              <input
                type="text"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 font-montserrat text-base text-ink outline-none focus:border-azul ${
                  errores.nombreCompleto ? "border-rojo-principal" : "border-black/15"
                }`}
              />
              {errores.nombreCompleto && (
                <p className="mt-1 font-montserrat text-xs text-rojo-principal">
                  {errores.nombreCompleto}
                </p>
              )}
            </div>

            <div>
              <label className="block font-montserrat text-sm font-medium text-azul/80">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 font-montserrat text-base text-ink outline-none focus:border-azul ${
                  errores.email ? "border-rojo-principal" : "border-black/15"
                }`}
              />
              {errores.email && (
                <p className="mt-1 font-montserrat text-xs text-rojo-principal">
                  {errores.email}
                </p>
              )}
            </div>

            <div>
              <label className="block font-montserrat text-sm font-medium text-azul/80">
                Teléfono
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className={`mt-1 w-full rounded-xl border px-4 py-2.5 font-montserrat text-base text-ink outline-none focus:border-azul ${
                  errores.telefono ? "border-rojo-principal" : "border-black/15"
                }`}
              />
              {errores.telefono && (
                <p className="mt-1 font-montserrat text-xs text-rojo-principal">
                  {errores.telefono}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between rounded-2xl bg-crema px-5 py-4">
            <span className="font-montserrat text-sm font-bold text-azul">
              Total ({viajeros.length} viajero{viajeros.length > 1 ? "s" : ""})
            </span>
            <span className="font-blur text-2xl text-azul">
              ${total.toLocaleString("en-US")}
            </span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-azul px-10 py-3.5 font-blur text-2xl uppercase tracking-wide text-white shadow-md transition-transform duration-300 hover:scale-[1.02]"
          >
            Continuar al pago
          </button>
        </form>
      )}

      {paso === "pago" && plan && (
        <div className="reserva-paso mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-2xl md:p-10">
          <h2 className="font-blur text-3xl leading-none text-azul md:text-4xl">
            Confirmar y pagar
          </h2>

          <div className="mt-5 space-y-2 rounded-2xl bg-crema p-5">
            <p className="font-montserrat text-sm text-ink">
              <strong className="font-bold">Plan:</strong> {plan.nombre}
            </p>
            <p className="font-montserrat text-sm text-ink">
              <strong className="font-bold">Viajeros:</strong>{" "}
              {viajeros.join(", ")}
            </p>
            <p className="font-montserrat text-sm text-ink">
              <strong className="font-bold">Titular:</strong> {nombreCompleto} —{" "}
              {email}
            </p>
            <p className="font-montserrat text-lg font-bold text-azul">
              Total: ${total.toLocaleString("en-US")}
            </p>
          </div>

          <div className="mt-6">
            <PagoPaypal
              planId={planId}
              viajeros={viajeros}
              contacto={{ nombreCompleto, email, telefono }}
              onSuccess={(id) => {
                setReservaId(id);
                setPaso("exito");
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setPaso("formulario")}
            className="mt-4 w-full font-montserrat text-sm font-medium text-azul underline"
          >
            Volver a editar mis datos
          </button>
        </div>
      )}

      {paso === "exito" && <ReservaConfirmada reservaId={reservaId} />}

      {paso !== "exito" && (
        <p className="mt-6 text-center">
          <Link
            href="/"
            className="font-montserrat text-sm font-medium text-azul underline"
          >
            Volver al inicio
          </Link>
        </p>
      )}
    </div>
  );
}
