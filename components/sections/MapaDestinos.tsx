"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { mediaUrl } from "@/lib/media";
import { destinosMapa, type DestinoMapa } from "@/lib/data/destinos-mapa";

function DestinoEnMapa({ destino }: { destino: DestinoMapa }) {
  return (
    <>
      {/* anclaje en div interno: GSAP anima el wrapper y pisaría su translate */}
      <div
        className={`map-destination-photo absolute z-20 ${destino.fotoAncho}`}
        style={{ top: destino.fotoPos.top, left: destino.fotoPos.left }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div
            className={`relative overflow-hidden rounded-xl border-2 border-white shadow-lg ${destino.fotoAspecto}`}
          >
            <Image
              src={destino.imagen}
              alt={`Vista de ${destino.nombre}`}
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <span className="absolute left-1/2 bottom-0 z-10 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full border border-white bg-rojo-principal px-3 py-1 font-blur text-[10px] uppercase leading-none text-white shadow-md lg:text-xs">
            {destino.nombre}
          </span>
        </div>
      </div>

      <div
        className="map-destination-pin absolute z-30 w-8 md:w-10 lg:w-12"
        style={{ top: destino.pinPos.top, left: destino.pinPos.left }}
      >
        <div className="-translate-x-1/2 -translate-y-full">
          <Image
            src={mediaUrl("landing/punto-map.png")}
            alt=""
            width={238}
            height={304}
            sizes="48px"
            className="h-auto w-full drop-shadow-lg"
          />
        </div>
      </div>
    </>
  );
}

function DestinoMobileCard({ destino }: { destino: DestinoMapa }) {
  return (
    <article>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-white shadow-lg">
        <Image
          src={destino.imagen}
          alt={`Vista de ${destino.nombre}`}
          fill
          sizes="(max-width: 768px) 50vw, 160px"
          className="object-cover"
        />
      </div>
      <p className="mt-2 text-center font-blur text-[11px] uppercase text-white">
        {destino.nombre}
      </p>
    </article>
  );
}

export function MapaDestinos() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const pins = gsap.utils.toArray<HTMLElement>(".map-destination-pin");
        const photos = gsap.utils.toArray<HTMLElement>(".map-destination-photo");
        const lines = gsap.utils.toArray<SVGLineElement>(".map-destination-line");

        // origen 0,0 = punto anclado en el mapa (el contenido va desplazado con translate)
        gsap.set(pins, { autoAlpha: 0, y: -18, scale: 0.6, transformOrigin: "0% 0%" });
        gsap.set(photos, { autoAlpha: 0, y: 18, scale: 0.92, transformOrigin: "0% 0%" });
        gsap.set(lines, { autoAlpha: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top 72%",
            once: true,
          },
        });

        pins.forEach((pin, index) => {
          timeline
            .to(
              pin,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "back.out(1.7)",
              },
              index * 0.15
            )
            .to(
              lines[index],
              {
                autoAlpha: 1,
                duration: 0.35,
                ease: "power2.out",
              },
              index * 0.15 + 0.1
            )
            .to(
              photos[index],
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
              },
              index * 0.15 + 0.16
            );
        });

        gsap.from(".mapa-intro", {
          autoAlpha: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".map-destination-pin, .map-destination-photo, .map-destination-line", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full overflow-hidden py-12 md:py-16"
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

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mapa-intro mb-10 md:mb-12">
          <p className="font-montserrat text-2xl font-bold text-white md:text-3xl">
            Ruta:{" "}
            <span className="font-blur text-3xl text-amarillo md:text-4xl">
              8 DÍAS Y 7 NOCHES
            </span>
          </p>

          <p className="mt-4 max-w-4xl font-montserrat text-lg text-white/90 md:text-xl">
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

        <div className="hidden md:block">
          <div className="relative">
            <div className="relative mx-auto aspect-[3863/2653] w-full">
              <Image
                src={mediaUrl("landing/MapaRD.png")}
                alt="Mapa ilustrativo de República Dominicana con destinos marcados"
                fill
                sizes="(max-width: 1280px) 94vw, 1280px"
                className="object-contain"
              />

              <svg
                className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {destinosMapa.map((destino) => (
                  <line
                    key={destino.id}
                    className="map-destination-line"
                    x1={destino.fotoPos.left}
                    y1={destino.fotoPos.top}
                    x2={destino.pinPos.left}
                    y2={destino.pinPos.top}
                    stroke="white"
                    strokeWidth="0.28"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {destinosMapa.map((destino) => (
                <DestinoEnMapa key={destino.id} destino={destino} />
              ))}
            </div>

          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:hidden">
          {destinosMapa.map((destino) => (
            <DestinoMobileCard key={destino.id} destino={destino} />
          ))}
        </div>

        <p className="mt-4 text-center font-montserrat text-xs text-white/70">
          **Mapa ilustrativo república dominicana
        </p>
      </div>
    </section>
  );
}
