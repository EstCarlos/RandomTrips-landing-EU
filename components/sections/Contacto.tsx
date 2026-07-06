"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type Estado = "idle" | "enviando" | "exito" | "error";

export function Contacto() {
  const container = useRef<HTMLElement>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".contacto-inner",
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setEstado("enviando");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setErrorMsg(body.error ?? "No se pudo enviar el mensaje");
        setEstado("error");
        return;
      }

      setEstado("exito");
      setNombre("");
      setEmail("");
      setMensaje("");
    } catch {
      setErrorMsg("No se pudo enviar el mensaje. Intenta de nuevo.");
      setEstado("error");
    }
  }

  return (
    <section
      ref={container}
      id="contacto"
      className="bg-white py-16 md:py-20 lg:py-24"
    >
      <div className="contacto-inner mx-auto w-full max-w-3xl px-4 md:px-6">
        <h2 className="font-blur text-4xl leading-[1.05] text-azul md:text-5xl">
          <span className="block">¿MÁS PREGUNTAS?</span>
          <span className="block">CONTACTANOS</span>
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 md:mt-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contacto-nombre" className="sr-only">
                Nombre completo
              </label>
              <input
                id="contacto-nombre"
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre completo"
                className="w-full rounded-xl bg-black/5 px-5 py-3.5 font-montserrat text-base font-medium text-ink placeholder:text-ink/45 outline-none focus:ring-2 focus:ring-azul"
              />
            </div>
            <div>
              <label htmlFor="contacto-email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="contacto-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full rounded-xl bg-black/5 px-5 py-3.5 font-montserrat text-base font-medium text-ink placeholder:text-ink/45 outline-none focus:ring-2 focus:ring-azul"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="contacto-mensaje" className="sr-only">
              Tu mensaje
            </label>
            <textarea
              id="contacto-mensaje"
              required
              rows={5}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Tu mensaje..."
              className="w-full resize-none rounded-xl bg-black/5 px-5 py-3.5 font-montserrat text-base font-medium text-ink placeholder:text-ink/45 outline-none focus:ring-2 focus:ring-azul"
            />
          </div>

          <button
            type="submit"
            disabled={estado === "enviando"}
            className="mt-5 w-full rounded-xl bg-azul px-8 py-3.5 font-montserrat text-lg font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg disabled:opacity-60"
          >
            {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {estado === "exito" && (
            <p className="mt-4 text-center font-montserrat text-sm font-bold text-azul">
              ¡Mensaje enviado! Te responderemos pronto.
            </p>
          )}
          {estado === "error" && (
            <p className="mt-4 text-center font-montserrat text-sm font-bold text-rojo-principal">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
