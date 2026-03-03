"use client";

import { useState } from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Fleet from "@/components/home/Fleet";
import CTA from "@/components/home/CTA";
import type { SearchState } from "@/types";

export default function HomePage() {
  const [searchState, setSearchState] = useState<SearchState | undefined>();

  return (
    <main>
      <Hero onSearch={setSearchState} />
      <Features />
      <Fleet searchState={searchState} />
      <CTA />
    </main>
  );
}
