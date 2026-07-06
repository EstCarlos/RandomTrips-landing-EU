"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export function HeroAtardecer() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".atardecer-img",
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        const split = SplitText.create(".atardecer-title", {
          type: "chars",
          mask: "chars",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 110,
              duration: 0.9,
              stagger: 0.025,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".atardecer-title",
                start: "top 80%",
                once: true,
              },
            }),
        });

        gsap.from(".atardecer-fade", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            once: true,
          },
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative overflow-hidden">
      <Image
        src="/images/bahia.png"
        alt="Atardecer naranja sobre el mar caribeño con una lancha navegando en República Dominicana"
        fill
        sizes="100vw"
        className="atardecer-img scale-110 object-cover will-change-transform"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-16 pb-64 md:px-6 md:pt-24 md:pb-80 lg:pb-96">
        <p className="atardecer-fade font-montserrat text-xl font-bold text-white md:text-2xl">
          Descubre la
        </p>

        <h2 className="atardecer-title mt-3 font-raices text-5xl leading-[0.95] text-white md:text-7xl lg:text-8xl">
          <span className="block">REPUBLICA</span>
          <span className="block">DOMINICANA</span>
        </h2>

        <p className="atardecer-fade mt-4 font-montserrat text-xl font-bold text-white md:text-2xl">
          como pocos la conocen.
        </p>

        <a
          href="/reservar"
          className="atardecer-fade mt-6 inline-block rounded-full bg-azul px-6 py-2.5 font-blur text-xl uppercase tracking-wide text-white shadow-md transition-transform duration-300 hover:scale-105 md:text-2xl"
        >
          Reserva tu lugar ahora
        </a>
      </div>
    </section>
  );
}
