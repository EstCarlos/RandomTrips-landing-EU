"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { mediaUrl } from "@/lib/media";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";
import { MapaDestinos } from "@/components/sections/MapaDestinos";
import {
  CompassIcon,
  LeafIcon,
  LandmarkIcon,
  PalmIcon,
  UsersIcon,
} from "@/components/shared/icons";

const tagsHero = [
  { label: "Aventura", Icon: CompassIcon },
  { label: "Naturaleza", Icon: LeafIcon },
  { label: "Cultura Local", Icon: LandmarkIcon },
  { label: "Playas Paradisíacas", Icon: PalmIcon },
  { label: "Viaje en Grupo", Icon: UsersIcon },
];

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
        gsap.to(".hero-vive-img", {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative bg-azul">
      <div className="relative overflow-hidden">
        <Image
          src={mediaUrl("landing/CayoLevantado.jpg")}
          alt="Vista aérea de Cayo Levantado, isla de aguas turquesas y palmeras en Samaná, República Dominicana"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-top"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-azul/85 via-azul/40 to-transparent"
          aria-hidden
        />
        {/* funde la foto a azul sólido justo antes de la costura con MapaDestinos,
            que arranca en azul sólido — sin esto queda un corte visible */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-azul/0 to-azul md:h-56"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 md:px-6 md:py-10">
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
              className="font-montserrat text-lg font-medium text-white transition-opacity hover:opacity-80 md:text-xl"
            >
              Contáctanos
            </a>
          </header>

          <div className="mt-12 max-w-5xl md:mt-16 lg:mt-20">
            <p className="hero-fade font-montserrat text-xl font-bold text-white md:text-2xl">
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
              <span className="font-montserrat text-2xl font-bold md:text-3xl">
                El corazón del
              </span>
              <span className="inline-block font-raices text-4xl text-white/80 md:text-5xl">
                CARIBE
              </span>
            </p>

            <p className="hero-fade mt-6 max-w-2xl font-montserrat text-lg font-medium text-white md:text-xl">
              Una experiencia creada para quienes quieren descubrir el país
              desde otra perspectiva.
            </p>

            <a
              href="/reservar"
              className="hero-fade hero-cta mt-8 inline-block rounded-full bg-amarillo px-10 py-4 font-blur text-3xl uppercase tracking-wide text-azul shadow-md md:text-4xl"
            >
              Reservar
            </a>
          </div>

          <div className="hero-fade pointer-events-none absolute right-6 bottom-40 z-10 hidden w-36 md:block lg:right-12 lg:w-44 xl:w-52">
            <Image
              src={mediaUrl("landing/vive.png")}
              alt="Vive lo inesperado — Alo Random"
              width={811}
              height={812}
              sizes="208px"
              className="hero-vive-img h-auto w-full"
            />
          </div>

          <ul className="hero-fade mt-auto flex max-w-3xl flex-wrap gap-2.5 pt-16 md:pt-20">
            {tagsHero.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3.5 py-1.5 text-azul shadow-sm"
              >
                <Icon className="size-3.5 shrink-0" />
                <span className="font-montserrat text-xs font-bold md:text-sm">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MapaDestinos />
    </section>
  );
}
