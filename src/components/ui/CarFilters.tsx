"use client";

import { cn } from "@/lib/utils";
import type { FilterState, CarCategory, TransmissionType } from "@/types";

const CATEGORIES: { label: string; value: CarCategory | "All" }[] = [
  { label: "All",      value: "All" },
  { label: "Economy",  value: "Economy" },
  { label: "Compact",  value: "Compact" },
  { label: "SUV",      value: "SUV" },
  { label: "Luxury",   value: "Luxury" },
  { label: "Sports",   value: "Sports" },
  { label: "Van",      value: "Van" },
];

const TRANSMISSIONS: { label: string; value: TransmissionType | "All" }[] = [
  { label: "Any",       value: "All" },
  { label: "Automatic", value: "Automatic" },
  { label: "Manual",    value: "Manual" },
];

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

export default function CarFilters({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onChange({ ...filters, category: value })}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-bold transition-all",
              filters.category === value
                ? "bg-amber-500 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Transmission + Price row */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Transmission */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Transmission:</span>
          <div className="flex gap-1.5">
            {TRANSMISSIONS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => onChange({ ...filters, transmission: value })}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  filters.transmission === value
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Max price */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Max: <span className="text-slate-800">${filters.maxPrice}/day</span>
          </span>
          <input
            type="range"
            min={50}
            max={400}
            step={10}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-28 accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
}
