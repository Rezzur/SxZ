"use client";

import SonyBiome from "@/components/SonyBiome";
import TerminalBiome from "@/components/TerminalBiome";
import GlassBiome from "@/components/GlassBiome";
export default function Home() {
  return (
    <main className="h-[100dvh] md:h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <section className="h-[100dvh] md:h-screen w-full snap-start">
        <SonyBiome />
      </section>

      <section className="h-[100dvh] md:h-screen w-full snap-start">
        <TerminalBiome />
      </section>

      {/* Сюда добавишь еще 3 секции */}
      <section className="h-[100dvh] md:h-screen w-full snap-start bg-zinc-900 flex items-center justify-center">
        <GlassBiome />
      </section>
    </main>
  );
}