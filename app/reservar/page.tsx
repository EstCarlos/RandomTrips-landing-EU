import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ReservaFlow } from "@/components/reserva/ReservaFlow";

export const metadata: Metadata = {
  title: "Reserva tu cupo — Random Trips República Dominicana",
  description:
    "Completa tus datos y asegura tu cupo para la experiencia de 8 días por República Dominicana con Random Trips.",
};

export default function ReservarPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-azul px-4 py-6 md:px-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link href="/">
            <Image
              src="/logos/random-trips-logo.svg"
              alt="Random Trips"
              width={161}
              height={48}
              className="h-9 w-auto md:h-11"
            />
          </Link>
          <p className="font-blur text-lg text-white md:text-xl">
            8 DÍAS Y 7 NOCHES
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <p className="font-montserrat text-sm font-bold uppercase tracking-wider text-azul/60">
          Asegura tu cupo
        </p>
        <h1 className="mt-2 font-blur text-4xl leading-none text-azul md:text-5xl">
          RESERVA TU LUGAR
        </h1>

        <div className="mt-8">
          <ReservaFlow />
        </div>
      </div>
    </main>
  );
}
