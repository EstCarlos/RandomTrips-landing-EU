"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { categoriasFaq, preguntasFrecuentes } from "@/lib/data/faq";

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 md:size-11 ${
        open ? "bg-black/10" : "bg-amarillo"
      }`}
    >
      <span
        className={`size-3 rotate-45 border-r-[3px] border-b-[3px] border-azul transition-transform duration-300 ${
          open ? "translate-y-0.5 rotate-225" : "-translate-y-0.5"
        }`}
        aria-hidden
      />
    </span>
  );
}

export function FAQ() {
  const container = useRef<HTMLElement>(null);
  const [categoriaActiva, setCategoriaActiva] = useState(
    categoriasFaq[0]?.id ?? ""
  );
  const [openId, setOpenId] = useState("");

  const preguntas = preguntasFrecuentes.filter(
    (faq) => faq.categoria === categoriaActiva
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".faq-title",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 78%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".faq-categoria",
          { autoAlpha: 0, y: 30, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".faq-categorias",
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  // animar la entrada de las preguntas al cambiar de categoría
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".faq-item",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
          }
        );
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [categoriaActiva] }
  );

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".faq-panel-shell");

      if (!panels.length) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        panels.forEach((panel) => {
          const isOpen = panel.dataset.panelId === openId;

          gsap.killTweensOf(panel);

          gsap.to(panel, {
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
            duration: isOpen ? 0.55 : 0.4,
            ease: isOpen ? "power3.inOut" : "power2.inOut",
          });
        });

        // la altura de la página cambia al abrir/cerrar: recalcular triggers
        gsap.delayedCall(0.6, () => ScrollTrigger.refresh());
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
    { scope: container, dependencies: [openId, categoriaActiva] }
  );

  function cambiarCategoria(id: string) {
    if (id !== categoriaActiva) {
      setCategoriaActiva(id);
      setOpenId("");
    }
  }

  return (
    <section
      ref={container}
      className="relative overflow-hidden bg-azul py-16 md:py-20 lg:py-24"
    >
      <Image
        src="/images/TEXTURA3x.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <h2 className="faq-title font-blur text-4xl leading-none text-white md:text-5xl lg:text-6xl">
          PREGUNTAS FRECUENTES
        </h2>

        <div className="faq-categorias mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-10 md:gap-6">
          {categoriasFaq.map((categoria) => {
            const activa = categoria.id === categoriaActiva;

            return (
              <button
                key={categoria.id}
                type="button"
                onClick={() => cambiarCategoria(categoria.id)}
                aria-pressed={activa}
                className={`faq-categoria relative flex flex-col items-center gap-3 rounded-2xl bg-white px-5 py-6 shadow-lg transition-all duration-300 md:py-8 ${
                  activa
                    ? "scale-[1.03] ring-4 ring-amarillo"
                    : "opacity-90 hover:opacity-100 hover:ring-2 hover:ring-white/60"
                }`}
              >
                <span className="text-4xl md:text-5xl" aria-hidden>
                  {categoria.emoji}
                </span>
                <span className="font-montserrat text-lg font-bold leading-tight text-azul md:text-xl">
                  {categoria.label}
                </span>

                {/* palomita: cola de globo que marca la categoría abierta */}
                <span
                  className={`absolute -bottom-2 left-1/2 size-4 -translate-x-1/2 rotate-45 bg-white transition-opacity duration-300 ${
                    activa ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <div className="mt-8 space-y-4 md:mt-10">
          {preguntas.map((faq) => {
            const isOpen = faq.id === openId;

            return (
              <div
                key={`${categoriaActiva}-${faq.id}`}
                className="faq-item rounded-2xl bg-white px-5 py-4 md:px-7 md:py-5"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-panel`}
                  onClick={() => setOpenId(isOpen ? "" : faq.id)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-montserrat text-lg font-bold leading-tight text-azul md:text-2xl">
                    {faq.pregunta}
                  </span>
                  <Chevron open={isOpen} />
                </button>

                <div
                  id={`${faq.id}-panel`}
                  className="faq-panel-shell h-0 overflow-hidden opacity-0"
                  data-panel-id={faq.id}
                  aria-hidden={!isOpen}
                >
                  <p className="pt-4 font-montserrat text-base leading-snug text-ink md:text-lg">
                    {faq.respuesta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
