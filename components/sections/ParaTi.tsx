"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { mediaUrl } from "@/lib/media";
import { esParaTiSi, noEsParaTiSi } from "@/lib/data/para-ti";
import { CheckIcon, XIcon } from "@/components/shared/icons";

function BloqueParaTi({
  titulo,
  items,
  variant,
}: {
  titulo: string;
  items: string[];
  variant: "si" | "no";
}) {
  const esPositivo = variant === "si";

  return (
    <div
      className={`parati-block max-w-3xl ${esPositivo ? "" : "md:ml-auto"}`}
    >
      <h2 className="parati-title font-blur text-4xl leading-none text-white md:text-5xl lg:text-6xl">
        {titulo}
      </h2>

      <ul className="mt-8 space-y-4 md:mt-10 md:space-y-5">
        {items.map((item) => (
          <li key={item} className="parati-item flex items-start gap-4">
            <span
              className="parati-chip mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-amarillo text-azul"
              aria-hidden
            >
              {esPositivo ? <CheckIcon /> : <XIcon />}
            </span>
            <span className="font-montserrat text-base font-medium leading-snug text-white md:text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ParaTi() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".parati-block").forEach((block) => {
          const title = block.querySelector(".parati-title");
          const items = block.querySelectorAll(".parati-item");
          const chips = block.querySelectorAll(".parati-chip");

          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              once: true,
            },
          });

          timeline
            .from(title, { autoAlpha: 0, y: 30, duration: 0.85 })
            .from(
              items,
              { autoAlpha: 0, y: 22, duration: 0.6, stagger: 0.08 },
              "-=0.4"
            )
            .from(
              chips,
              {
                scale: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "back.out(1.7)",
              },
              "<"
            );
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative overflow-hidden bg-azul py-16 md:py-20 lg:py-24"
    >
      <Image
        src={mediaUrl("landing/esto-es-para-ti.jpg")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-top"
        aria-hidden
      />

      {/* degradado azul de abajo hacia arriba sobre la foto */}
      <div
        className="absolute inset-0 bg-linear-to-t from-azul via-azul/70 to-azul/15"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
        <BloqueParaTi
          titulo="ESTA EXPERIENCIA ES PARA TI SI:"
          items={esParaTiSi}
          variant="si"
        />

        <div className="mt-16 flex flex-col items-center gap-12 md:mt-24 md:flex-row md:justify-between md:gap-16">
          <div className="w-44 shrink-0 md:w-56 lg:w-64">
            <Image
              src={mediaUrl("landing/vive.png")}
              alt="Vive lo inesperado — Alo Random"
              width={811}
              height={812}
              sizes="256px"
              className="h-auto w-full"
            />
          </div>

          <BloqueParaTi
            titulo="NO ES PARA TI SI:"
            items={noEsParaTiSi}
            variant="no"
          />
        </div>
      </div>
    </section>
  );
}
