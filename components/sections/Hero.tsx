"use client";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";

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
      <div className="relative min-h-screen overflow-hidden">
        <Image
          src="/images/hero-beach.JPG"
          alt="Vista aérea de una playa caribeña de arena blanca con palmeras y aguas turquesa en República Dominicana"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-azul via-azul/80 to-azul/25"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 md:px-6 md:py-10">
          <header className="flex items-center justify-between">
            <Image
              src="/logos/random-trips-logo.svg"
              alt="Random Trips"
              width={161}
              height={48}
              className="h-10 w-auto md:h-12"
            />
            <a
              href="#contacto"
              className="font-montserrat text-sm text-white transition-opacity hover:opacity-80"
            >
              Contacto
            </a>
          </header>

          <div className="mt-12 max-w-3xl md:mt-16 lg:mt-20">
            <p className="hero-fade font-helvetica-now text-lg text-white md:text-xl">
              Explora
            </p>

            <SplitTextReveal
              as="h1"
              className="mt-3 font-raices text-6xl leading-none text-white md:text-7xl lg:text-8xl"
            >
              <span className="block">REPUBLICA</span>
              <span className="block">DOMINICANA</span>
            </SplitTextReveal>

            <p className="hero-fade mt-4 flex items-baseline gap-3 text-white">
              <span className="font-helvetica-now text-xl md:text-2xl">
                El corazón del
              </span>
              <span className="inline-block font-raices text-3xl italic text-white/80 md:text-4xl">
                CARIBE
              </span>
            </p>

            <p className="hero-fade mt-6 max-w-md font-myriad text-base text-white md:text-lg">
              Una experiencia creada para quienes quieren descubrir el país
              desde otra perspectiva.
            </p>

            <a
              href="#planes"
              className="hero-fade hero-cta mt-8 inline-block rounded-full border-2 border-azul bg-amarillo px-8 py-3 font-blur text-2xl uppercase tracking-wide text-azul shadow-md md:text-3xl"
            >
              Reservar
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <p className="hero-fade font-montserrat text-xl text-white md:text-2xl">
          Ruta:{" "}
          <span className="font-blur text-2xl text-amarillo md:text-3xl">
            8 DÍAS Y 7 NOCHES
          </span>
        </p>

        <p className="hero-fade mt-4 max-w-3xl font-myriad text-base text-white/90 md:text-lg">
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
    </section>
  );
}
