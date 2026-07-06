"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { hosts, bioHosts, type Host as HostData } from "@/lib/data/hosts";

function HostCard({ host, side }: { host: HostData; side: "left" | "right" }) {
  return (
    <div
      className={`host-card relative h-full overflow-hidden rounded-2xl will-change-transform ${
        side === "left" ? "host-card-left" : "host-card-right"
      }`}
    >
      <div className="relative aspect-282/436 md:aspect-auto md:h-full">
        <Image
          src={host.foto}
          alt={`${host.nombre[0]} ${host.nombre[1]}, ${host.rol} de la experiencia Random Trips`}
          fill
          sizes="(max-width: 768px) 80vw, 300px"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/75 via-ink/30 to-transparent px-4 pt-16 pb-5 text-center">
        <h3 className="font-blur text-3xl uppercase leading-[0.9] text-white md:text-4xl">
          {host.nombre[0]} {host.nombre[1]}
        </h3>
        <p className="mt-1.5 font-montserrat text-sm font-medium text-white/90">
          {host.rol}
        </p>
      </div>
    </div>
  );
}

export function Host() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".host-heading", {
          autoAlpha: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 78%",
            once: true,
          },
        });

        const revealFrom = (selector: string, vars: gsap.TweenVars) =>
          gsap.from(selector, {
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".host-grid",
              start: "top 80%",
              once: true,
            },
            ...vars,
          });

        revealFrom(".host-card-left", { x: -60 });
        revealFrom(".host-card-right", { x: 60 });
        revealFrom(".host-bio", { y: 30, delay: 0.15 });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  const [bernat, randy] = hosts;

  return (
    <section
      ref={container}
      className="bg-rojo-principal py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <h2 className="host-heading font-blur text-5xl leading-none text-white md:text-6xl lg:text-7xl">
          CONOCE LOS HOSTS
        </h2>

        <div className="host-grid mt-12 grid gap-12 md:mt-16 md:grid-cols-[minmax(0,282px)_1fr_minmax(0,282px)] md:gap-6 lg:gap-8">
          <div className="mx-auto w-full max-w-75 md:mx-0 md:max-w-none">
            <HostCard host={bernat} side="left" />
          </div>

          <div className="host-bio flex flex-col gap-5 font-montserrat text-base leading-relaxed text-white">
            <div className="space-y-5">
              {bioHosts.slice(0, 3).map((parrafo) => (
                <p key={parrafo.slice(0, 24)}>{parrafo}</p>
              ))}
            </div>

            <div className="mt-auto">
              <hr className="border-white/40" />
              <p className="mt-5">{bioHosts[3]}</p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-75 md:mx-0 md:max-w-none">
            <HostCard host={randy} side="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
