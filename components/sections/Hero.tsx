"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";
import { MapaDestinos } from "@/components/sections/MapaDestinos";

export function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-fade", {
          opacity: 0,
          y: 24,
          duration: 1,
          delay: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        });
        gsap.to(".hero-cta", {
          scale: 1.05,
          duration: 1.2,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
          delay: 1.8,
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative bg-azul">
      <div className="relative overflow-hidden">
        <Image
          src="/images/samana.JPG"
          alt="Vista aérea de una playa caribeña de arena blanca con palmeras y aguas turquesa en República Dominicana"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-azul/90 via-azul/50 to-azul/10"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[48%] bg-linear-to-b from-azul/0 via-azul/85 to-azul"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-6 py-8 md:px-10 md:py-10 lg:px-12">
          <header className="flex items-center justify-between">
            <Image
              src="/logos/random-trips-logo.svg"
              alt="Random Trips"
              width={161}
              height={48}
              className="h-10 w-auto md:h-15"
            />
            <a
              href="#contacto"
              className="font-montserrat text-sm text-white transition-opacity hover:opacity-80"
            >
              Contacto
            </a>
          </header>

          <div className="mt-12 max-w-5xl md:mt-16 lg:mt-20">
            <p className="hero-fade font-helvetica-now text-xl text-white md:text-2xl">
              Explora
            </p>

            <SplitTextReveal
              as="h1"
              className="mt-3 font-raices text-7xl leading-[0.9] text-white md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem]"
            >
              <span className="block">REPUBLICA</span>
              <span className="block">DOMINICANA</span>
            </SplitTextReveal>

            <p className="hero-fade mt-4 flex items-baseline gap-3 text-white">
              <span className="font-myriad text-2xl md:text-3xl">
                El corazón del
              </span>
              <span className="inline-block font-raices text-4xl text-white/80 md:text-5xl">
                CARIBE
              </span>
            </p>

            <p className="hero-fade mt-6 max-w-2xl font-myriad text-lg text-white md:text-xl">
              Una experiencia creada para quienes quieren descubrir el país
              desde otra perspectiva.
            </p>

            <a
              href="#planes"
              className="hero-fade hero-cta mt-8 inline-block rounded-full border-2 border-azul bg-amarillo px-10 py-4 font-blur text-3xl uppercase tracking-wide text-azul shadow-md md:text-4xl"
            >
              Reservar
            </a>
          </div>

          <div className="mt-auto pt-24 md:pt-28">
            <p className="hero-fade font-montserrat text-2xl text-white md:text-3xl">
              Ruta:{" "}
              <span className="font-blur text-3xl text-amarillo md:text-4xl">
                8 DÍAS Y 7 NOCHES
              </span>
            </p>

            <p className="hero-fade mt-4 max-w-4xl font-myriad text-lg text-white/90 md:text-xl">
              Una travesía que recorre lo mejor de{" "}
              <strong className="font-semibold">República Dominicana</strong>,
              desde playas{" "}
              <strong className="font-semibold">
                paradisíacas, charcos y saltos
              </strong>
              , hasta encantadores pueblos costeros y vibrantes ciudades. De{" "}
              <strong className="font-semibold">norte</strong> a{" "}
              <strong className="font-semibold">sur</strong> y de este a oeste,
              vivirás aventuras únicas en{" "}
              <strong className="font-semibold">
                Puerto Plata, Río San Juan, Samaná, Santo Domingo y el Sur
                profundo
              </strong>
              , conectando cada destino con cultura, naturaleza y la{" "}
              <strong className="font-semibold">esencia auténtica</strong> del{" "}
              <strong className="font-semibold">Caribe</strong>.
            </p>
          </div>
        </div>
      </div>

      <MapaDestinos />
    </section>
  );
}
