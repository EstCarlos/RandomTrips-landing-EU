"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { preguntasFrecuentes } from "@/lib/data/faq";

function Chevron({ open }: { open: boolean }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black/5 md:size-11">
      <span
        className={`size-3 rotate-45 border-r-[3px] border-b-[3px] border-azul transition-transform duration-300 ${
          open ? "translate-y-0.5 rotate-[225deg]" : "-translate-y-0.5"
        }`}
        aria-hidden
      />
    </span>
  );
}

export function FAQ() {
  const container = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState("");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-title", {
          autoAlpha: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 78%",
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
    { scope: container, dependencies: [openId] }
  );

  return (
    <section ref={container} className="relative">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/fondo-atras-mapa.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-azul/70" />
      </div>

      {/* flex evita que el -mt del box colapse y arrastre la sección entera */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 pb-16 md:px-6 md:pb-20 lg:pb-24">
        <div className="-mt-28 rounded-3xl bg-azul p-5 shadow-2xl md:-mt-36 md:p-10 lg:-mt-40 lg:p-12">
          <h2 className="faq-title font-blur text-4xl leading-none text-white md:text-5xl lg:text-6xl">
            PREGUNTAS FRECUENTES
          </h2>

          <div className="mt-8 space-y-4 md:mt-10">
            {preguntasFrecuentes.map((faq) => {
              const isOpen = faq.id === openId;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white px-5 py-4 md:px-7 md:py-5"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-panel`}
                    onClick={() => setOpenId(isOpen ? "" : faq.id)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="font-helvetica-now text-lg leading-tight text-azul md:text-2xl">
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
                    <p className="pt-4 font-myriad text-base leading-snug text-ink md:text-lg">
                      {faq.respuesta}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
