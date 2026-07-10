"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { vivencias, type Vivencia } from "@/lib/data/lo-que-viviremos";

function VivenciaCard({ vivencia }: { vivencia: Vivencia }) {
  return (
    <article className="vivencia-card group relative aspect-304/280 overflow-hidden rounded-[31px] shadow-xl">
      <Image
        src={vivencia.imagen}
        alt={vivencia.titulo}
        fill
        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 30vw, 360px"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/5 to-black/70" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
        <h3 className="font-montserrat text-xl font-bold leading-none md:text-2xl">
          {vivencia.titulo}
        </h3>
        <p className="mt-1 font-montserrat text-sm leading-tight text-white/85 md:text-base">
          {vivencia.subtitulo}
        </p>
      </div>
    </article>
  );
}

export function LoQueViviremos() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".vivencias-title", {
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

        gsap.from(".vivencia-card", {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vivencias-grid",
            start: "top 82%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section ref={container} className="bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <h2 className="vivencias-title font-blur text-5xl leading-none text-azul md:text-6xl lg:text-7xl">
          LO QUE VIVIREMOS
        </h2>

        <div className="vivencias-grid mt-8 grid gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-5">
          {vivencias.map((vivencia) => (
            <VivenciaCard key={vivencia.id} vivencia={vivencia} />
          ))}
        </div>
      </div>
    </section>
  );
}
