"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { XIcon } from "@/components/shared/icons";

function Flecha({ direccion }: { direccion: "izq" | "der" }) {
  return (
    <span
      className={`block size-4 rotate-45 border-azul ${
        direccion === "izq"
          ? "translate-x-0.5 border-b-4 border-l-4"
          : "-translate-x-0.5 border-t-4 border-r-4"
      }`}
      aria-hidden
    />
  );
}

export function GaleriaLightbox({
  titulo,
  fotos,
  onClose,
}: {
  titulo: string;
  fotos: string[];
  onClose: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const anterior = () => setIndex((i) => (i - 1 + fotos.length) % fotos.length);
  const siguiente = () => setIndex((i) => (i + 1) % fotos.length);

  // bloquear el scroll del body mientras el lightbox está abierto
  useEffect(() => {
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft")
        setIndex((i) => (i - 1 + fotos.length) % fotos.length);
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % fotos.length);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fotos.length, onClose]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          container.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          ".lightbox-imagen",
          { scale: 0.92, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.45, ease: "power3.out" }
        );
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  // transición suave al cambiar de foto
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".lightbox-imagen",
          { autoAlpha: 0.4, scale: 0.985 },
          { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power2.out" }
        );
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [index] }
  );

  return (
    <div
      ref={container}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de fotos: ${titulo}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar galería"
        className="absolute right-5 top-5 z-20 flex size-11 items-center justify-center rounded-full bg-white text-azul shadow-lg transition-transform duration-200 hover:scale-110"
      >
        <XIcon className="size-5" />
      </button>

      {fotos.length > 1 && (
        <button
          type="button"
          onClick={anterior}
          aria-label="Foto anterior"
          className="absolute left-3 z-20 flex size-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200 hover:scale-110 md:left-8 md:size-16"
        >
          <Flecha direccion="izq" />
        </button>
      )}

      <figure className="lightbox-imagen flex w-full max-w-4xl flex-col items-center">
        {/* width/height solo reservan el ratio inicial: h-auto/w-auto dejan que
            cada foto conserve su proporción original (vertical u horizontal) */}
        <Image
          key={fotos[index]}
          src={fotos[index]}
          alt={`${titulo} — foto ${index + 1} de ${fotos.length}`}
          width={1600}
          height={1200}
          sizes="(max-width: 896px) 92vw, 896px"
          className="h-auto max-h-[60vh] w-auto max-w-full rounded-3xl object-contain md:max-h-[70vh]"
        />
        <figcaption className="mt-4 flex w-full items-center justify-between text-white">
          <span className="font-montserrat text-base font-bold md:text-lg">
            {titulo}
          </span>
          <span className="font-montserrat text-sm font-medium text-white/80">
            {index + 1} / {fotos.length}
          </span>
        </figcaption>
      </figure>

      {fotos.length > 1 && (
        <button
          type="button"
          onClick={siguiente}
          aria-label="Foto siguiente"
          className="absolute right-3 z-20 flex size-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200 hover:scale-110 md:right-8 md:size-16"
        >
          <Flecha direccion="der" />
        </button>
      )}
    </div>
  );
}
