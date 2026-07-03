"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { hosts, bioHosts, type Host as HostData } from "@/lib/data/hosts";

function HostCard({ host, side }: { host: HostData; side: "left" | "right" }) {
  return (
    <div
      className={`host-card relative will-change-transform ${
        side === "left" ? "host-card-left" : "host-card-right"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/25">
        {host.foto && (
          <Image
            src={host.foto}
            alt={`${host.nombre[0]} ${host.nombre[1]}, host de Random Trips`}
            fill
            sizes="(max-width: 768px) 80vw, 300px"
            className="object-cover"
          />
        )}
      </div>

      <h3 className="absolute -bottom-5 left-5 font-blur text-4xl uppercase leading-[0.85] text-crema md:-bottom-6 md:text-5xl">
        <span className="block">{host.nombre[0]}</span>
        <span className="block">{host.nombre[1]}</span>
      </h3>
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
        <h2 className="host-heading flex flex-wrap items-baseline gap-x-4 font-blur text-white">
          <span className="text-4xl md:text-5xl">CONOCE EL</span>
          <span className="text-7xl leading-none md:text-8xl lg:text-9xl">
            HOST
          </span>
        </h2>

        <div className="host-grid mt-12 grid gap-12 md:mt-16 md:grid-cols-[minmax(0,260px)_1fr_minmax(0,260px)] md:gap-8 lg:gap-12">
          <div className="mx-auto w-full max-w-[300px] md:mx-0">
            <HostCard host={bernat} side="left" />
          </div>

          <div className="host-bio space-y-5 self-center text-center font-myriad text-base leading-relaxed text-ink md:text-lg">
            {bioHosts.map((parrafo) => (
              <p key={parrafo.slice(0, 24)}>{parrafo}</p>
            ))}
          </div>

          <div className="mx-auto w-full max-w-[300px] md:mx-0">
            <HostCard host={randy} side="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
