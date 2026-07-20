import { BandaPDF } from "../components/sections/BandaPDF";
import { Contacto } from "../components/sections/Contacto";
import { CTAFinal } from "../components/sections/CTAFinal";
import { FAQ } from "../components/sections/FAQ";
import { Hero } from "../components/sections/Hero";
import { HeroAtardecer } from "../components/sections/HeroAtardecer";
import { Host } from "../components/sections/Host";
import { IncluyeNoIncluye } from "../components/sections/IncluyeNoIncluye";
import { Itinerario } from "../components/sections/Itinerario";
import { LoQueViviremos } from "../components/sections/LoQueViviremos";
import { ModalidadPago } from "../components/sections/ModalidadPago";
import { ParaTi } from "../components/sections/ParaTi";
import { Sponsors } from "../components/sections/Sponsors";
import { Preloader } from "../components/shared/Preloader";
import { getGalerias } from "../lib/galeria";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ omitirIntro?: string }>;
}) {
  const omitirIntro = (await searchParams).omitirIntro === "1";
  const galerias = await getGalerias();

  return (
    <main className="flex-1">
      <Preloader omitir={omitirIntro} />
      <Hero />
      <LoQueViviremos />
      <Itinerario galerias={galerias} />
      <IncluyeNoIncluye />
      <Sponsors />
      <Host />
      <ModalidadPago />
      <ParaTi />
      <BandaPDF />
      <HeroAtardecer />
      <FAQ />
      <Contacto />
      <CTAFinal />
    </main>
  );
}
