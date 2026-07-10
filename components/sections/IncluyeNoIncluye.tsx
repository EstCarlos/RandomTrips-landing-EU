"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { incluye, noIncluye } from "@/lib/data/incluye-no-incluye";
import { CheckIcon, XIcon } from "@/components/shared/icons";

function TarjetaLista({
  titulo,
  eyebrow,
  items,
  variant,
}: {
  titulo: string;
  eyebrow: string;
  items: string[];
  variant: "incluye" | "no-incluye";
}) {
  const isIncluded = variant === "incluye";

  return (
    <article
      className={`include-card rounded-3xl p-6 shadow-xl will-change-transform md:p-8 lg:p-10 ${
        isIncluded ? "bg-white text-azul" : "bg-rojo-principal text-white"
      }`}
    >
      <p
        className={`inline-flex rounded-full px-3.5 py-1.5 font-montserrat text-xs font-bold uppercase tracking-wider ${
          isIncluded ? "bg-amarillo text-azul" : "bg-white text-rojo-principal"
        }`}
      >
        {eyebrow}
      </p>

      <h3 className="mt-5 font-blur text-4xl leading-none md:text-5xl">
        {titulo}
      </h3>

      <ul
        className={`mt-6 gap-y-3.5 md:mt-8 ${
          isIncluded ? "grid gap-x-8 sm:grid-cols-2" : "space-y-3.5"
        }`}
      >
        {items.map((item) => (
          <li key={item} className="include-item flex items-start gap-3">
            <span
              className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
                isIncluded
                  ? "bg-amarillo text-azul"
                  : "bg-white/20 text-white"
              }`}
              aria-hidden
            >
              {isIncluded ? <CheckIcon /> : <XIcon />}
            </span>
            <span
              className={`font-montserrat text-base font-semibold leading-snug md:text-lg ${
                isIncluded ? "text-azul" : "text-white/92"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function IncluyeNoIncluye() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = gsap.utils.toArray<HTMLElement>(".include-heading");
        const cards = gsap.utils.toArray<HTMLElement>(".include-card");
        const items = gsap.utils.toArray<HTMLElement>(".include-item");

        ScrollTrigger.create({
          trigger: container.current,
          start: "top 76%",
          once: true,
          onEnter: () => {
            const timeline = gsap.timeline({
              defaults: { ease: "power3.out" },
            });

            timeline
              .fromTo(
                heading,
                { autoAlpha: 0, y: 34 },
                { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.1 }
              )
              .fromTo(
                cards,
                { autoAlpha: 0, y: 46, scale: 0.97 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.9,
                  stagger: 0.14,
                },
                "-=0.35"
              )
              .fromTo(
                items,
                { autoAlpha: 0, x: -18 },
                {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.55,
                  stagger: 0.03,
                },
                "-=0.35"
              );
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative -mt-20 overflow-hidden bg-azul pt-28 pb-16 md:-mt-24 md:pt-32 md:pb-20 lg:-mt-28 lg:pt-36 lg:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-azul/0 to-azul"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="include-heading max-w-3xl">
          <p className="font-montserrat text-lg text-white/85 md:text-xl">
            Todo listo para moverte ligero
          </p>
          <h2 className="mt-4 font-blur text-5xl leading-none text-white md:text-6xl lg:text-7xl">
            LO QUE INCLUYE
          </h2>
        </div>

        <div className="mt-10 grid items-start gap-6 md:mt-12 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
          <TarjetaLista
            titulo="Incluido"
            eyebrow="Dentro del viaje"
            items={incluye}
            variant="incluye"
          />
          <TarjetaLista
            titulo="No incluye"
            eyebrow="A considerar"
            items={noIncluye}
            variant="no-incluye"
          />
        </div>
      </div>
    </section>
  );
}
