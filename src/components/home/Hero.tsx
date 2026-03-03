"use client";

import { motion } from "framer-motion";
import BookingForm from "@/components/ui/BookingForm";
import { Shield, Clock, ThumbsUp } from "lucide-react";
type SearchState = { pickupLocation: string; returnLocation: string; pickupDate: string; returnDate: string; rentalDays: number; };
interface Props {
  onSearch?: (state: SearchState) => void;
}

export default function Hero({ onSearch }: Props) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=90&auto=format&fit=crop"
        alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/92 via-blue-900/75 to-blue-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Melbourne&apos;s #1 Rated — 4.9★ · 1,200+ Reviews</span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-7xl">Book Your Car</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">
                in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Melbourne</span>
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl">Instantly</span>
            </h1>

            <p className="text-slate-300 text-xl leading-relaxed mb-10 max-w-lg">
              500+ vehicles. 70+ pickup locations. Zero hidden fees.
              From the airport to every suburb — we&apos;ve got you covered.
            </p>

            <div className="flex flex-wrap gap-6 mb-12">
              {[
                { Icon: Shield, text: "Free Cancellation" },
                { Icon: Clock, text: "24/7 Support" },
                { Icon: ThumbsUp, text: "No Hidden Fees" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/80">
                  <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {[
                { value: "500+", label: "Vehicles" },
                { value: "70+", label: "Locations" },
                { value: "50k+", label: "Happy Drivers" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">{s.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <BookingForm onSearch={onSearch} />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}
