"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function Sponsors() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".sponsors-inner", {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative bg-amarillo py-10 md:py-12">
      <div className="sponsors-inner mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 md:gap-x-14 md:px-6">
        <p className="font-montserrat text-sm font-semibold text-azul md:text-base">
          Experiencia por:
        </p>

        <Image
          src="/logos/random-trips-logo-azul.svg"
          alt="Random Trips"
          width={999}
          height={298}
          className="h-10 w-auto md:h-12"
        />

        <p className="font-blur text-3xl uppercase leading-[0.95] text-azul md:text-4xl lg:text-5xl">
          <span className="block">República</span>
          <span className="block">Dominicana</span>
        </p>
      </div>
    </section>
  );
}
