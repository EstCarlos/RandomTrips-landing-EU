"use client";

export function VolverButton({ className = "" }: { className?: string }) {
  function volver() {
    window.location.href = "/?omitirIntro=1";
  }

  return (
    <button
      type="button"
      onClick={volver}
      className={`inline-flex items-center rounded-full bg-black/5 px-4 py-2 font-montserrat text-sm font-bold text-azul transition-colors hover:bg-black/10 ${className}`}
    >
      Volver
    </button>
  );
}
