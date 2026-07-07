"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { itinerario, type DiaItinerario } from "@/lib/data/itinerario";
import { GaleriaLightbox } from "@/components/sections/GaleriaLightbox";

function Chevron({ open }: { open: boolean }) {
  return (
    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-black/5 md:size-16">
      <span
        className={`size-4 rotate-45 border-r-4 border-b-4 border-azul transition-transform duration-300 ${
          open ? "translate-y-1 rotate-225" : "-translate-y-1"
        }`}
        aria-hidden
      />
    </span>
  );
}

function ItinerarioPanel({
  dia,
  onVerGaleria,
}: {
  dia: DiaItinerario;
  onVerGaleria?: () => void;
}) {
  return (
    <div className="itinerary-panel overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="grid gap-6 p-4 md:grid-cols-[280px_1fr] md:gap-8 md:p-0 lg:grid-cols-[320px_1fr]">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl md:aspect-auto md:min-h-70 md:rounded-r-none md:rounded-l-3xl">
          <Image
            src={dia.imagen}
            alt={dia.titulo}
            fill
            sizes="(max-width: 768px) 92vw, 320px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center pb-6 md:py-8 md:pr-10 lg:pr-14">
          <h3 className="font-montserrat text-3xl font-bold leading-tight text-azul md:text-4xl">
            <span className="mr-4 font-blur">{dia.dia}</span>
            {dia.titulo}
          </h3>
          <p className="mt-5 font-montserrat text-lg leading-snug text-azul md:text-xl">
            {dia.descripcion}
          </p>

          {onVerGaleria && (
            <button
              type="button"
              onClick={onVerGaleria}
              className="mt-5 inline-flex w-fit items-center rounded-full bg-amarillo px-4 py-1.5 font-montserrat text-sm font-bold text-azul shadow-sm transition-transform duration-200 hover:scale-105"
            >
              Ver Galería de fotos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Itinerario({
  galerias = {},
}: {
  galerias?: Record<string, string[]>;
}) {
  const container = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState(itinerario[0]?.id ?? "");
  const [galeriaAbierta, setGaleriaAbierta] = useState<DiaItinerario | null>(
    null
  );

  // mientras no haya fotos cargadas en /public/images/galeria/<dia-id>/,
  // el carrusel usa la imagen principal del día como única foto
  const fotosDe = (dia: DiaItinerario) =>
    galerias[dia.id]?.length ? galerias[dia.id] : [dia.imagen];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".itinerary-kicker, .itinerary-title", {
          opacity: 0,
          y: 28,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 78%",
            once: true,
          },
        });

        gsap.from(".itinerary-row", {
          opacity: 0,
          x: -32,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".itinerary-list",
            start: "top 82%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".itinerary-panel-shell");

      if (!panels.length) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        panels.forEach((panel) => {
          const isOpen = panel.dataset.panelId === openId;
          const content = panel.querySelector<HTMLElement>(".itinerary-panel");
          const image = panel.querySelector("img");

          gsap.killTweensOf(panel);

          gsap.to(panel, {
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
            duration: isOpen ? 0.75 : 0.45,
            ease: isOpen ? "power3.inOut" : "power2.inOut",
          });

          if (isOpen && content) {
            gsap.fromTo(
              content,
              { y: 18 },
              { y: 0, duration: 0.75, ease: "power3.out" }
            );
          }

          if (isOpen && image) {
            gsap.fromTo(
              image,
              { x: -22, scale: 1.04 },
              { x: 0, scale: 1, duration: 0.85, ease: "power3.out" }
            );
          }
        });

        // la altura de la página cambia al abrir/cerrar: recalcular triggers
        gsap.delayedCall(0.85, () => ScrollTrigger.refresh());
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        panels.forEach((panel) => {
          const isOpen = panel.dataset.panelId === openId;

          gsap.set(panel, {
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          });
        });

        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [openId] }
  );

  return (
    <section ref={container} className="relative overflow-hidden py-16 md:py-20 lg:py-24">
      <Image
        src="/images/fondo-atras-mapa.png"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-azul/78" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-52 bg-linear-to-b from-azul/0 via-azul/90 to-azul"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <p className="itinerary-kicker font-montserrat text-lg text-white md:text-xl">
          Del{" "}
          <strong className="font-bold">
            Miércoles 2 al Viernes 11 de Septiembre
          </strong>
        </p>

        <h2 className="itinerary-title mt-8 font-blur text-5xl leading-none text-white md:text-6xl lg:text-7xl">
          ITINERARIO DEL VIAJE
        </h2>

        <div className="itinerary-list mt-10 space-y-4 md:mt-12 md:space-y-5">
          {itinerario.map((dia) => {
            const isOpen = dia.id === openId;

            return (
              <div key={dia.id} className="itinerary-row">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${dia.id}-panel`}
                  onClick={() => setOpenId(isOpen ? "" : dia.id)}
                  className="flex w-full items-center gap-4 rounded-3xl bg-white px-5 py-4 text-left text-azul shadow-lg transition-transform hover:scale-[1.01] md:gap-6 md:px-8 md:py-5"
                >
                  <span className="font-blur text-4xl leading-none md:text-5xl">
                    {dia.dia}
                  </span>
                  <span className="min-w-0 flex-1 font-montserrat text-2xl font-bold leading-tight md:text-3xl">
                    {dia.titulo}
                  </span>
                  <Chevron open={isOpen} />
                </button>

                <div
                  id={`${dia.id}-panel`}
                  className={`itinerary-panel-shell overflow-hidden pt-0 ${
                    isOpen ? "" : "h-0 opacity-0"
                  }`}
                  data-panel-id={dia.id}
                  aria-hidden={!isOpen}
                >
                  <div className="pt-5">
                    <ItinerarioPanel
                      dia={dia}
                      onVerGaleria={
                        dia.id === "dia-9"
                          ? undefined
                          : () => setGaleriaAbierta(dia)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {galeriaAbierta && (
        <GaleriaLightbox
          titulo={`${galeriaAbierta.dia} — ${galeriaAbierta.titulo}`}
          fotos={fotosDe(galeriaAbierta)}
          onClose={() => setGaleriaAbierta(null)}
        />
      )}
    </section>
  );
}
