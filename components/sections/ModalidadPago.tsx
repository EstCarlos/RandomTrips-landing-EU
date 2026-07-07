"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { mediaUrl } from "@/lib/media";
import { planes, type Plan } from "@/lib/data/planes";
import { CheckIcon } from "@/components/shared/icons";

function PlanCard({ plan }: { plan: Plan }) {
  return (
    // el offset estático va en este wrapper, NUNCA en el elemento que anima GSAP:
    // GSAP escribe `transform` como inline style y pisaría por completo la clase
    // Tailwind de traslado si estuvieran en el mismo nodo (bug real, ver CLAUDE.md).
    <div className={plan.destacado ? "md:-translate-y-12" : ""}>
      <article className="plan-card relative flex flex-col rounded-3xl bg-white p-6 shadow-xl will-change-transform md:p-7">
        {plan.destacado && (
          <span className="absolute -top-4 left-6 -rotate-2 rounded-full bg-amarillo px-3.5 py-1.5 font-montserrat text-xs font-bold uppercase tracking-wider text-azul shadow-sm">
            Más elegido
          </span>
        )}

        <h3 className="font-blur text-4xl leading-none text-azul md:text-5xl">
          {plan.nombre.toUpperCase()}
        </h3>

        {/* TODO: precios reales — placeholders de lib/data/planes.ts */}
        <p className="mt-3 font-montserrat text-2xl font-bold text-azul">
          ${plan.precioPorPersona.toLocaleString("en-US")}
          <span className="ml-1 text-sm font-medium text-azul/70">
            / persona
          </span>
        </p>

        <ul className="mt-5 flex-1 space-y-2.5">
          {plan.incluye.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-amarillo text-azul"
                aria-hidden
              >
                <CheckIcon className="size-3" />
              </span>
              <span className="font-montserrat text-sm leading-snug text-ink md:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <a
          href="/reservar"
          className="mt-6 inline-block rounded-full bg-azul px-8 py-2.5 text-center font-blur text-xl uppercase tracking-wide text-white shadow-md transition-transform duration-300 hover:scale-105"
        >
          Reservar
        </a>
      </article>
    </div>
  );
}

export function ModalidadPago() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".pago-heading",
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 78%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".plan-card",
          { autoAlpha: 0, y: 46, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".pago-grid",
              start: "top 80%",
              once: true,
            },
          }
        );

        gsap.to(".pago-vive-img", {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="planes"
      className="relative bg-azul pt-20 pb-16 md:pt-24 md:pb-20 lg:pb-24"
    >
      <Image
        src={mediaUrl("landing/TEXTURA3x.png")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
        aria-hidden
      />

      {/* sticker "Vive lo inesperado" montado sobre el borde con la sección Host */}
      <div className="pointer-events-none absolute right-6 top-0 z-20 w-28 -translate-y-1/2 md:right-16 md:w-36 lg:w-44">
        <Image
          src={mediaUrl("landing/vive.png")}
          alt="Vive lo inesperado — Alo Random"
          width={811}
          height={812}
          sizes="176px"
          className="pago-vive-img h-auto w-full"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="pago-heading">
          <h2 className="font-blur text-5xl leading-none text-white md:text-6xl lg:text-7xl">
            MODALIDAD DE PAGO
          </h2>
          <p className="mt-2 font-montserrat text-sm font-bold uppercase tracking-wider text-white md:text-base">
            Asegura tu cupo
          </p>
        </div>

        <div className="pago-grid mt-12 grid gap-6 md:mt-24 md:grid-cols-3 md:gap-7">
          {planes.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mt-10 text-justify font-montserrat text-base leading-relaxed text-white/90 md:mt-12 md:text-lg">
          Una travesía que recorre lo mejor de{" "}
          <strong className="font-bold">República Dominicana</strong>, desde
          playas <strong className="font-bold">paradisíacas, charcos y saltos</strong>,
          hasta encantadores pueblos costeros y vibrantes ciudades. De{" "}
          <strong className="font-bold">norte</strong> a{" "}
          <strong className="font-bold">sur</strong> y de{" "}
          <strong className="font-bold">este</strong> a{" "}
          <strong className="font-bold">oeste</strong>, vivirás aventuras únicas
          conectando cada destino con cultura, naturaleza y la esencia auténtica
          del Caribe.
        </p>
      </div>
    </section>
  );
}
