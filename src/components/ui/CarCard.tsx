import { useState } from "react";
import { Users, Zap, Fuel, Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import type { Car, SearchState } from "@/types";
import BookingModal from "@/components/ui/BookingModal";

const FUEL_BADGE: Record<Car["fuel"], string> = {
  Electric: "bg-green-500 text-white",
  Hybrid:   "bg-teal-500 text-white",
  Petrol:   "bg-blue-500 text-white",
  Diesel:   "bg-blue-700 text-white",
};

interface Props {
  car: Car;
  searchState?: SearchState;
}

export default function CarCard({ car, searchState }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article
        className={cn(
          "group bg-white rounded-2xl overflow-hidden border border-slate-100",
          "hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-1.5 transition-all duration-300",
          !car.available && "opacity-60"
        )}
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-green-50 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={car.imageUrl} alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wide">
            {car.category}
          </span>
          <span className={cn("absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm", FUEL_BADGE[car.fuel])}>
            {car.fuel}
          </span>

          {!car.available && (
            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
              <span className="bg-white text-slate-800 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">Unavailable</span>
            </div>
          )}

          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white text-xs font-bold">{car.rating}</span>
            <span className="text-white/60 text-xs">({car.reviewCount})</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="mb-4">
            <h3 className="font-display font-bold text-slate-900 text-lg leading-tight">{car.brand} {car.model}</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">{car.year} Model</p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { Icon: Users, label: `${car.seats} Seats` },
              { Icon: Zap,   label: car.transmission },
              { Icon: Fuel,  label: car.fuel },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 bg-slate-50 rounded-xl py-2.5">
                <Icon className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-slate-600 font-semibold text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {car.features.slice(0, 3).map((f) => (
              <span key={f} className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                <CheckCircle className="w-3 h-3" />{f}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <div className="font-display font-bold text-2xl text-slate-900">
                {formatPrice(car.pricePerDay)}
              </div>
              <div className="text-xs text-slate-400 font-medium">per day</div>
            </div>
            <button
              disabled={!car.available}
              onClick={() => car.available && setShowModal(true)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                car.available
                  ? "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white shadow-md hover:shadow-lg active:scale-95"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              {car.available ? "Book Now" : "Unavailable"}
            </button>
          </div>
        </div>
      </article>

      {/* Booking Modal */}
      {showModal && (
        <BookingModal
          car={car}
          searchState={searchState}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
