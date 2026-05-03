"use client";

import SonyBiome from "@/components/SonyBiome";
import TerminalBiome from "@/components/TerminalBiome";
import GlassBiome from "@/components/GlassBiome";
export default function Home() {
  return (
    <main className="h-[100dvh] md:h-screen overflow-y-auto overflow-x-hidden snap-y snap-proximity md:snap-mandatory scroll-smooth overscroll-y-contain">
      <section className="min-h-[100svh] md:h-screen w-full snap-start">
        <SonyBiome />
      </section>

      <section className="min-h-[100svh] md:h-screen w-full snap-start">
        <TerminalBiome />
      </section>

      {/* Сюда добавишь еще 3 секции */}
      <section className="min-h-[100svh] md:h-screen w-full snap-start bg-zinc-900 flex items-center justify-center">
        <GlassBiome />
      </section>
    </main>
  );
}
