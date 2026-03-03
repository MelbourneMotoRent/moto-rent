"use client";
import { useState } from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Fleet from "@/components/home/Fleet";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  const [searchState, setSearchState] = useState<{
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
    rentalDays: number;
  } | undefined>();

  return (
    <main>
      <Hero onSearch={setSearchState} />
      <Features />
      <Fleet searchState={searchState} />
      <CTA />
    </main>
  );
}
