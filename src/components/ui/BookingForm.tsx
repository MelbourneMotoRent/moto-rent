"use client";

import { useState } from "react";
import { MapPin, Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { PICKUP_LOCATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function BookingForm() {
  const [pickup,   setPickup]   = useState(PICKUP_LOCATIONS[0]);
  const [dropoff,  setDropoff]  = useState(PICKUP_LOCATIONS[0]);
  const [fromDate, setFromDate] = useState("");
  const [toDate,   setToDate]   = useState("");
  const [showPickupList,  setShowPickupList]  = useState(false);
  const [showDropoffList, setShowDropoffList] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  function handleSearch() {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 px-6 py-4">
        <h2 className="font-display font-bold text-xl text-white">Find Your Car</h2>
        <p className="text-white/80 text-sm mt-0.5">Instant booking · No credit card fees</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Pickup location */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Pickup Location
          </label>
          <button
            type="button"
            onClick={() => { setShowPickupList((v) => !v); setShowDropoffList(false); }}
            className="w-full flex items-center gap-3 border-2 border-slate-200 hover:border-blue-400 focus:border-blue-500 rounded-xl px-4 py-3 text-left transition-colors bg-white"
          >
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="flex-1 text-sm font-semibold text-slate-800 truncate">{pickup}</span>
            <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", showPickupList && "rotate-180")} />
          </button>
          {showPickupList && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden max-h-52 overflow-y-auto">
              {PICKUP_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => { setPickup(loc); setShowPickupList(false); }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm flex items-center gap-2.5 transition-colors",
                    pickup === loc ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropoff location */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Return Location
          </label>
          <button
            type="button"
            onClick={() => { setShowDropoffList((v) => !v); setShowPickupList(false); }}
            className="w-full flex items-center gap-3 border-2 border-slate-200 hover:border-blue-400 focus:border-blue-500 rounded-xl px-4 py-3 text-left transition-colors bg-white"
          >
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="flex-1 text-sm font-semibold text-slate-800 truncate">{dropoff}</span>
            <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", showDropoffList && "rotate-180")} />
          </button>
          {showDropoffList && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden max-h-52 overflow-y-auto">
              {PICKUP_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => { setDropoff(loc); setShowDropoffList(false); }}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm flex items-center gap-2.5 transition-colors",
                    dropoff === loc ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Pickup Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
              <input
                type="date"
                min={today}
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  if (toDate && e.target.value >= toDate) setToDate("");
                }}
                className="w-full pl-9 pr-3 py-3 border-2 border-slate-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none rounded-xl text-sm font-semibold text-slate-800 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Return Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
              <input
                type="date"
                min={fromDate || today}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full pl-9 pr-3 py-3 border-2 border-slate-200 hover:border-blue-400 focus:border-blue-500 focus:outline-none rounded-xl text-sm font-semibold text-slate-800 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Days summary */}
        {fromDate && toDate && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-blue-800 font-medium">Total rental duration</span>
            <span className="font-bold text-blue-700">
              {Math.round((new Date(toDate).getTime() - new Date(fromDate).getTime()) / 86400000)} days
            </span>
          </div>
        )}

        {/* CTA button */}
        <button
          type="button"
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 active:scale-[0.98] text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-500/30"
        >
          Search Available Cars
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-xs text-slate-400">
          Free cancellation · No credit card surcharge · Instant confirmation
        </p>
      </div>
    </div>
  );
}
