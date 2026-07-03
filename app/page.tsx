import { BandaPDF } from "../components/sections/BandaPDF";
import { FAQ } from "../components/sections/FAQ";
import { Hero } from "../components/sections/Hero";
import { HeroAtardecer } from "../components/sections/HeroAtardecer";
import { Host } from "../components/sections/Host";
import { IncluyeNoIncluye } from "../components/sections/IncluyeNoIncluye";
import { Itinerario } from "../components/sections/Itinerario";
import { LoQueViviremos } from "../components/sections/LoQueViviremos";
import { ParaTi } from "../components/sections/ParaTi";
import { Sponsors } from "../components/sections/Sponsors";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <LoQueViviremos />
      <Itinerario />
      <IncluyeNoIncluye />
      <Sponsors />
      <Host />
      <ParaTi />
      <BandaPDF />
      <HeroAtardecer />
      <FAQ />
    </main>
  );
}
