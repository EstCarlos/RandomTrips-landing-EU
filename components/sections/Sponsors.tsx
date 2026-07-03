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
      <div className="sponsors-inner mx-auto grid w-full max-w-6xl items-center gap-8 px-4 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-6">
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <p className="font-montserrat text-sm font-semibold text-ink md:text-base">
            Experiencia por
          </p>
          <Image
            src="/logos/random-trips-logo-azul.svg"
            alt="Random Trips"
            width={999}
            height={298}
            className="h-8 w-auto md:h-9"
          />
        </div>

        <p className="text-center font-montserrat text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-azul md:text-4xl lg:text-5xl">
          <span className="block">República</span>
          <span className="block">Dominicana</span>
        </p>

        <p className="text-center font-myriad text-lg italic text-azul md:justify-self-end md:text-xl md:[writing-mode:vertical-rl] md:rotate-180">
          Creative Experience
        </p>
      </div>
    </section>
  );
}
