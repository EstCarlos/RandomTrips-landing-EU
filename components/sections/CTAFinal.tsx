"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { mediaUrl } from "@/lib/media";

const WHATSAPP_URL = "https://wa.link/ayrgeu";

export function CTAFinal() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
            once: true,
          },
        });

        timeline
          .fromTo(
            ".cta-final-card",
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 0.9 }
          )
          .fromTo(
            ".cta-final-boton",
            { autoAlpha: 0, scale: 0.6 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: "back.out(1.7)",
            },
            "-=0.35"
          );
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative overflow-hidden bg-azul">
      {/* la foto va en el flujo con altura propia; la tarjeta se superpone con
          margen negativo y debajo de la foto queda la banda azul sólida */}
      <div className="relative h-85 w-full md:h-105 lg:aspect-1440/460 lg:h-auto">
        <Image
          src={mediaUrl("landing/bahia6.png")}
          alt="Playa de arena blanca con aguas turquesas en Bahía de las Águilas, República Dominicana"
          fill
          sizes="100vw"
          className="object-cover object-[50%_65%]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-b from-azul/0 via-azul/60 to-azul"
          aria-hidden
        />
      </div>

      {/* textura de líneas topográficas sobre el degradado */}
      <Image
        src={mediaUrl("landing/TEXTURA3x.png")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
        aria-hidden
      />

      <div className="relative z-10 mx-auto -mt-60 w-full max-w-6xl px-4 pb-24 md:-mt-72 md:px-6 md:pb-28 lg:-mt-90 lg:pb-32">
        <div className="cta-final-card rounded-[3rem] bg-white px-6 py-10 text-center shadow-2xl md:px-14 md:py-14">
          <h2 className="font-blur text-4xl leading-none text-azul md:text-5xl lg:text-6xl">
            ¿TE UNES A LA EXPERIENCIA?
          </h2>

          <p className="mt-4 font-montserrat text-lg text-azul md:mt-5 md:text-xl">
            El <strong className="font-bold">grupo</strong> ya se está
            formando. Solo <strong className="font-bold">falta tu nombre</strong>{" "}
            en la lista.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-9 md:mt-10">
            <a
              href="/reservar"
              className="cta-final-boton inline-block w-full rounded-full bg-azul px-12 py-3 font-blur text-3xl uppercase leading-none tracking-wide text-white shadow-md transition-transform duration-300 hover:scale-105 sm:w-auto md:text-4xl"
            >
              Reservar
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="cta-final-boton inline-block w-full rounded-full bg-whatsapp px-12 py-3 font-blur text-3xl uppercase leading-none tracking-wide text-white shadow-md transition-transform duration-300 hover:scale-105 sm:w-auto md:text-4xl"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
