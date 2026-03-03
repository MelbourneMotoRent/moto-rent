"use client";

import { useState, useMemo } from "react";
import CarCard from "@/components/ui/CarCard";
import CarFilters from "@/components/ui/CarFilters";
import { CARS } from "@/lib/data";
import type { FilterState, SearchState } from "@/types";

const DEFAULT_FILTERS: FilterState = {
  category: "All",
  maxPrice: 400,
  transmission: "All",
  minSeats: 1,
};

interface Props {
  searchState?: SearchState;
}

export default function Fleet({ searchState }: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const filtered = useMemo(
    () =>
      CARS.filter((car) => {
        if (filters.category !== "All" && car.category !== filters.category) return false;
        if (car.pricePerDay > filters.maxPrice) return false;
        if (filters.transmission !== "All" && car.transmission !== filters.transmission) return false;
        if (car.seats < filters.minSeats) return false;
        return true;
      }),
    [filters]
  );

  return (
    <section id="fleet" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">
              Our Fleet
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 leading-tight">
              Choose Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                Perfect Ride
              </span>
            </h2>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display font-bold text-3xl text-slate-900">{filtered.length}</div>
            <div className="text-slate-500 text-sm font-medium">vehicles available</div>
          </div>
        </div>

        {/* Search summary bar */}
        {searchState && searchState.pickupDate && searchState.returnDate && (
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 text-white text-sm">
              <span>📍 <strong>{searchState.pickupLocation}</strong></span>
              <span>📅 {searchState.pickupDate} → {searchState.returnDate}</span>
              <span>🗓️ <strong>{searchState.rentalDays} days</strong></span>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Prices shown for your dates
            </span>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm">
          <CarFilters filters={filters} onChange={setFilters} />
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                searchState={searchState}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-200">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="font-display font-bold text-xl text-slate-800 mb-2">
              No cars match your filters
            </h3>
            <p className="text-slate-500 mb-6">Try adjusting your search criteria.</p>
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
