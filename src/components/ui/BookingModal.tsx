"use client";

import { useState } from "react";
import { X, MapPin, Calendar, Shield, ChevronRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculatePrice, formatPrice, DEFAULT_ADDONS } from "@/lib/pricing";
import type { Car, SearchState, AddonItem } from "@/types";

interface Props {
  car: Car;
  searchState?: SearchState;
  onClose: () => void;
}

type Step = "details" | "addons" | "summary";

export default function BookingModal({ car, searchState, onClose }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [step, setStep] = useState<Step>("details");
  const [addons, setAddons] = useState<AddonItem[]>(DEFAULT_ADDONS);
  const [submitted, setSubmitted] = useState(false);

  // Form fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseExpiry: "",
    pickupDate: searchState?.pickupDate || today,
    returnDate: searchState?.returnDate || tomorrow,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const price = calculatePrice(
    car.pricePerDay,
    form.pickupDate,
    form.returnDate,
    addons
  );

  function updateForm(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function toggleAddon(id: string) {
    setAddons((prev) =>
      prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
    );
  }

  function validateDetails() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.licenseNumber.trim()) e.licenseNumber = "Required";
    if (!form.licenseExpiry) e.licenseExpiry = "Required";
    if (!form.pickupDate) e.pickupDate = "Required";
    if (!form.returnDate) e.returnDate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === "details" && validateDetails()) setStep("addons");
    else if (step === "addons") setStep("summary");
  }

  function handleSubmit() {
    // In a real app this would call Stripe
    setSubmitted(true);
  }

  // ─── Success Screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-2">
            Thank you, <strong>{form.firstName}</strong>! Your booking for the{" "}
            <strong>{car.brand} {car.model}</strong> has been received.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            A confirmation email will be sent to <strong>{form.email}</strong> shortly.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Pickup</span><span className="font-semibold">{form.pickupDate}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Return</span><span className="font-semibold">{form.returnDate}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Duration</span><span className="font-semibold">{price.rentalDays} days</span></div>
            <div className="flex justify-between border-t pt-2"><span className="font-bold">Total</span><span className="font-bold text-blue-700">{formatPrice(price.total)}</span></div>
          </div>
          <button onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold rounded-xl"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="font-bold text-white text-lg">{car.brand} {car.model}</h2>
            <p className="text-white/80 text-sm">{formatPrice(car.pricePerDay)}/day</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex border-b border-slate-100">
          {(["details", "addons", "summary"] as Step[]).map((s, i) => (
            <div key={s} className={cn(
              "flex-1 py-3 text-center text-xs font-bold uppercase tracking-wide transition-colors",
              step === s ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400"
            )}>
              {i + 1}. {s === "details" ? "Your Details" : s === "addons" ? "Add-ons" : "Review"}
            </div>
          ))}
        </div>

        <div className="p-6">

          {/* ── STEP 1: DETAILS ── */}
          {step === "details" && (
            <div className="space-y-5">
              <h3 className="font-bold text-slate-800 text-lg">Driver Details & Dates</h3>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
                    <input type="date" min={today} value={form.pickupDate}
                      onChange={(e) => updateForm("pickupDate", e.target.value)}
                      className={cn("w-full pl-9 pr-3 py-3 border-2 rounded-xl text-sm font-semibold focus:outline-none transition-colors",
                        errors.pickupDate ? "border-red-400" : "border-slate-200 focus:border-blue-500")}
                    />
                  </div>
                  {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
                    <input type="date" min={form.pickupDate || today} value={form.returnDate}
                      onChange={(e) => updateForm("returnDate", e.target.value)}
                      className={cn("w-full pl-9 pr-3 py-3 border-2 rounded-xl text-sm font-semibold focus:outline-none transition-colors",
                        errors.returnDate ? "border-red-400" : "border-slate-200 focus:border-blue-500")}
                    />
                  </div>
                  {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
                </div>
              </div>

              {/* Duration pill */}
              {form.pickupDate && form.returnDate && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex justify-between text-sm">
                  <span className="text-blue-700 font-medium">📅 {price.rentalDays} days rental</span>
                  <span className="font-bold text-blue-800">{formatPrice(price.total)} total (inc. GST)</span>
                </div>
              )}

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "firstName", label: "First Name", placeholder: "John" },
                  { key: "lastName", label: "Last Name", placeholder: "Smith" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
                    <input type="text" placeholder={placeholder} value={form[key as keyof typeof form]}
                      onChange={(e) => updateForm(key, e.target.value)}
                      className={cn("w-full px-4 py-3 border-2 rounded-xl text-sm font-semibold focus:outline-none transition-colors",
                        errors[key] ? "border-red-400" : "border-slate-200 focus:border-blue-500")}
                    />
                    {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                  </div>
                ))}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "email", label: "Email", placeholder: "john@email.com", type: "email" },
                  { key: "phone", label: "Phone", placeholder: "04XX XXX XXX", type: "tel" },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]}
                      onChange={(e) => updateForm(key, e.target.value)}
                      className={cn("w-full px-4 py-3 border-2 rounded-xl text-sm font-semibold focus:outline-none transition-colors",
                        errors[key] ? "border-red-400" : "border-slate-200 focus:border-blue-500")}
                    />
                    {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                  </div>
                ))}
              </div>

              {/* Licence */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Licence Number</label>
                  <input type="text" placeholder="e.g. 12345678" value={form.licenseNumber}
                    onChange={(e) => updateForm("licenseNumber", e.target.value)}
                    className={cn("w-full px-4 py-3 border-2 rounded-xl text-sm font-semibold focus:outline-none transition-colors",
                      errors.licenseNumber ? "border-red-400" : "border-slate-200 focus:border-blue-500")}
                  />
                  {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Licence Expiry</label>
                  <input type="date" value={form.licenseExpiry}
                    onChange={(e) => updateForm("licenseExpiry", e.target.value)}
                    className={cn("w-full px-4 py-3 border-2 rounded-xl text-sm font-semibold focus:outline-none transition-colors",
                      errors.licenseExpiry ? "border-red-400" : "border-slate-200 focus:border-blue-500")}
                  />
                  {errors.licenseExpiry && <p className="text-red-500 text-xs mt-1">{errors.licenseExpiry}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: ADD-ONS ── */}
          {step === "addons" && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-lg">Optional Add-ons</h3>
              <p className="text-slate-500 text-sm">Enhance your rental experience. All prices per day.</p>
              {addons.map((addon) => (
                <button key={addon.id} type="button" onClick={() => toggleAddon(addon.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                    addon.selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300 bg-white"
                  )}
                >
                  <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                    addon.selected ? "border-blue-500 bg-blue-500" : "border-slate-300"
                  )}>
                    {addon.selected && <CheckCircle className="w-4 h-4 text-white fill-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-800 text-sm">{addon.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{addon.description}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-blue-700">{formatPrice(addon.pricePerDay)}/day</div>
                    {price.rentalDays > 0 && (
                      <div className="text-xs text-slate-400">{formatPrice(addon.pricePerDay * price.rentalDays)} total</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── STEP 3: SUMMARY ── */}
          {step === "summary" && (
            <div className="space-y-5">
              <h3 className="font-bold text-slate-800 text-lg">Booking Summary</h3>

              {/* Car */}
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                <img src={car.imageUrl} alt={car.name}
                  className="w-24 h-16 object-cover rounded-lg shrink-0"
                />
                <div>
                  <div className="font-bold text-slate-900">{car.brand} {car.model}</div>
                  <div className="text-slate-500 text-sm">{car.year} · {car.transmission} · {car.fuel}</div>
                </div>
              </div>

              {/* Dates & location */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <div className="text-blue-600 font-bold text-xs uppercase mb-1">Pickup</div>
                  <div className="font-semibold text-slate-800">{form.pickupDate}</div>
                  <div className="text-slate-500 text-xs truncate">{searchState?.pickupLocation || "Selected location"}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-xl">
                  <div className="text-green-600 font-bold text-xs uppercase mb-1">Return</div>
                  <div className="font-semibold text-slate-800">{form.returnDate}</div>
                  <div className="text-slate-500 text-xs truncate">{searchState?.returnLocation || "Selected location"}</div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 font-bold text-xs text-slate-500 uppercase tracking-wide">Price Breakdown</div>
                <div className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{formatPrice(price.dailyRate)} × {price.rentalDays} days</span>
                    <span className="font-semibold">{formatPrice(price.basePrice)}</span>
                  </div>
                  {price.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{price.discountLabel}</span>
                      <span>-{formatPrice(price.discountAmount)}</span>
                    </div>
                  )}
                  {addons.filter(a => a.selected).map(a => (
                    <div key={a.id} className="flex justify-between text-slate-600">
                      <span>{a.name}</span>
                      <span>{formatPrice(a.pricePerDay * price.rentalDays)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-slate-500 text-xs pt-2 border-t">
                    <span>GST (10%)</span>
                    <span>{formatPrice(price.gst)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-200">
                    <span>Total (AUD)</span>
                    <span className="text-blue-700">{formatPrice(price.total)}</span>
                  </div>
                </div>
              </div>

              {/* Driver summary */}
              <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-1">
                <div className="font-bold text-slate-700 mb-2">Driver: {form.firstName} {form.lastName}</div>
                <div className="text-slate-500">{form.email} · {form.phone}</div>
                <div className="text-slate-500">Licence: {form.licenseNumber} (exp. {form.licenseExpiry})</div>
              </div>

              {/* Bond notice */}
              <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <Shield className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold text-amber-800">Bond Pre-authorisation</div>
                  <div className="text-amber-700 text-xs mt-0.5">
                    A ${car.pricePerDay > 150 ? "1000" : "500"} bond will be pre-authorised on your card. This is not a charge — it will be released on return.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer buttons */}
          <div className="flex gap-3 mt-8">
            {step !== "details" && (
              <button
                onClick={() => setStep(step === "summary" ? "addons" : "details")}
                className="px-5 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={step === "summary" ? handleSubmit : handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold rounded-xl transition-all shadow-md"
            >
              {step === "summary" ? "Confirm & Pay" : "Continue"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
