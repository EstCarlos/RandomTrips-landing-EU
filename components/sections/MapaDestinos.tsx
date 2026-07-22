"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { mediaUrl } from "@/lib/media";

/**
 * Ruta del viaje sobre el mapa de República Dominicana.
 *
 * El mapa es una sola imagen que ya trae los puntos y las fotos de cada
 * destino: sustituyó al montaje anterior (mapa + pines + fotos posicionados
 * por porcentajes y animados uno a uno), que era frágil de mantener y pesado
 * en móvil.
 */
export function MapaDestinos() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".mapa-intro", {
          autoAlpha: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 80%", once: true },
        });

        gsap.from(".mapa-imagen", {
          autoAlpha: 0,
          y: 24,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 72%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full overflow-hidden py-8 md:py-10"
    >
      <Image
        src={mediaUrl("landing/fondo-atras-mapa.png")}
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-azul/70" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-azul via-azul/95 to-azul/0 md:h-64"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mapa-intro mb-5 md:mb-7">
          <p className="font-montserrat text-2xl font-bold text-white md:text-3xl">
            Ruta:{" "}
            <span className="font-blur text-3xl text-amarillo md:text-4xl">
              8 DÍAS Y 7 NOCHES
            </span>
          </p>

          <p className="mt-3 w-full font-montserrat text-base leading-snug text-white/90 md:text-lg">
            Una travesía que recorre lo mejor de{" "}
            <strong className="font-bold">República Dominicana</strong>,
            desde playas{" "}
            <strong className="font-bold">
              paradisíacas, charcos y saltos
            </strong>
            , hasta encantadores pueblos costeros y vibrantes ciudades. De{" "}
            <strong className="font-bold">norte</strong> a{" "}
            <strong className="font-bold">sur</strong> y de este a oeste,
            vivirás aventuras únicas en{" "}
            <strong className="font-bold">
              Puerto Plata, Río San Juan, Samaná, Santo Domingo y el Sur
              profundo
            </strong>
            , conectando cada destino con cultura, naturaleza y la{" "}
            <strong className="font-bold">esencia auténtica</strong> del{" "}
            <strong className="font-bold">Caribe</strong>.
          </p>
        </div>

        <div className="mapa-imagen relative mx-auto aspect-[2588/1883] w-full max-w-4xl lg:max-w-5xl">
          <Image
            src={mediaUrl("landing/Mapa-rd-con-fotos.png")}
            alt="Mapa ilustrativo de República Dominicana con los destinos del viaje y fotos de cada uno"
            fill
            sizes="(max-width: 1280px) 94vw, 1280px"
            className="object-contain"
          />
        </div>

        <p className="mt-4 text-center font-montserrat text-xs text-white/70">
          **Mapa ilustrativo república dominicana
        </p>
      </div>
    </section>
  );
}
