"use client";
import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Fleet from "@/components/home/Fleet";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Fleet />
      <CTA />
    </main>
  );
}
