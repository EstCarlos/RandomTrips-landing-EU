"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const PDF_URL = "/asset-pdf/Itinerario%20Bernat%20x%20Random%20Trips%20copy.pdf";

export function BandaPDF() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".banda-pdf-inner", {
          autoAlpha: 0,
          y: 36,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 88%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-rojo-principal py-10 md:py-12">
      <div className="banda-pdf-inner mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:px-6 md:text-left">
        <h2 className="max-w-xl font-blur text-3xl leading-[1.05] text-crema md:text-4xl">
          ¿QUIERES EL PDF CON TODA LA INFO EN DETALLE?
        </h2>

        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener"
          className="inline-block rounded-full bg-crema px-8 py-3 font-blur text-2xl uppercase tracking-wide text-rojo-principal shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl md:px-10 md:text-3xl"
        >
          Descargar PDF
        </a>
      </div>
    </section>
  );
}
