"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { PreloaderLogo } from "@/components/shared/PreloaderLogo";

/**
 * Overlay de carga inicial: las letras de RANDOM entran con pop (back.out),
 * TRIPS con fade+slide, y la cortina crema sube revelando la página.
 * Solo aparece en cargas completas (hard load) — las navegaciones SPA no
 * remontan el componente.
 */
export function Preloader() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const overlay = container.current;
      if (!overlay) return;

      // bloquear el scroll mientras la cortina está visible
      document.documentElement.classList.add("overflow-hidden");
      const desbloquear = () =>
        document.documentElement.classList.remove("overflow-hidden");

      const ocultar = () => {
        desbloquear();
        overlay.style.display = "none";
      };

      const mm = gsap.matchMedia();

      // el orden DOM de las letras en el SVG no es el visual: ordenarlas
      // por posición X para que el stagger entre de izquierda a derecha
      const porPosicionX = (selector: string) =>
        gsap.utils
          .toArray<SVGGraphicsElement>(selector)
          .sort((a, b) => a.getBBox().x - b.getBBox().x);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ onComplete: ocultar });

        timeline
          // R-N-D-O-M entran con pop; la A se reserva para su propia caída
          .fromTo(
            porPosicionX(".pre-random"),
            { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%" },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: "back.out(2)",
            },
            0.15
          )
          // la A cae desde arriba y rebota al llegar a su lugar, completando "RANDOM"
          .fromTo(
            ".pre-random-a",
            { autoAlpha: 0, y: -160 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "bounce.out",
            },
            "-=0.1"
          )
          .fromTo(
            porPosicionX(".pre-trips"),
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.05,
              ease: "power3.out",
            },
            "-=0.25"
          )
          .to(
            overlay,
            { yPercent: -100, duration: 0.7, ease: "power3.inOut" },
            "+=0.45"
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(overlay, {
          autoAlpha: 0,
          duration: 0.3,
          delay: 0.2,
          onComplete: ocultar,
        });
      });

      return () => {
        mm.revert();
        desbloquear();
      };
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="preloader fixed inset-0 z-100 flex items-center justify-center bg-crema"
      aria-hidden
    >
      {/* sin JS la cortina nunca se animaría: ocultarla para no tapar la página */}
      <noscript>
        <style>{`.preloader{display:none}`}</style>
      </noscript>

      <div className="w-64 px-6 md:w-96">
        <PreloaderLogo className="h-auto w-full" />
      </div>
    </div>
  );
}
