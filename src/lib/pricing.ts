import type { AddonItem, PriceBreakdown } from "@/types";

// ─── Calculate Rental Price ───────────────────────────────────────────────────
export function calculatePrice(
  dailyRate: number,
  pickupDate: string,
  returnDate: string,
  addons: AddonItem[] = []
): PriceBreakdown {
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);
  const rentalDays = Math.max(
    1,
    Math.round((returnD.getTime() - pickup.getTime()) / 86400000)
  );

  const basePrice = dailyRate * rentalDays;

  // Discount logic
  let discountPct = 0;
  let discountLabel = "No discount";
  if (rentalDays >= 28) {
    discountPct = 20;
    discountLabel = "Long-term discount (20% off)";
  } else if (rentalDays >= 7) {
    discountPct = 10;
    discountLabel = "Weekly discount (10% off)";
  }

  const discountAmount = Math.round(basePrice * (discountPct / 100) * 100) / 100;

  // Add-ons total
  const selectedAddons = addons.filter((a) => a.selected);
  const addonsTotal = selectedAddons.reduce(
    (sum, a) => sum + a.pricePerDay * rentalDays,
    0
  );

  const subtotal = basePrice - discountAmount + addonsTotal;
  const gst = Math.round(subtotal * 0.1 * 100) / 100;
  const total = Math.round((subtotal + gst) * 100) / 100;

  return {
    dailyRate,
    rentalDays,
    basePrice,
    discountLabel,
    discountPct,
    discountAmount,
    addonsTotal,
    subtotal,
    gst,
    total,
  };
}

// ─── Format Currency ──────────────────────────────────────────────────────────
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Default Add-ons ─────────────────────────────────────────────────────────
export const DEFAULT_ADDONS: AddonItem[] = [
  {
    id: "gps",
    name: "GPS Navigation",
    description: "Portable GPS unit for easy navigation",
    pricePerDay: 5,
    selected: false,
  },
  {
    id: "child_seat",
    name: "Child Seat",
    description: "Approved child safety seat (0–4 years)",
    pricePerDay: 10,
    selected: false,
  },
  {
    id: "booster",
    name: "Booster Seat",
    description: "Approved booster seat (4–8 years)",
    pricePerDay: 8,
    selected: false,
  },
  {
    id: "basic_protection",
    name: "Basic Protection",
    description: "Reduce bond to $250. Basic damage cover.",
    pricePerDay: 15,
    selected: false,
  },
  {
    id: "premium_protection",
    name: "Premium Protection",
    description: "Zero excess. Full damage cover included.",
    pricePerDay: 30,
    selected: false,
  },
  {
    id: "roadside",
    name: "Roadside Assistance",
    description: "24/7 roadside assistance coverage",
    pricePerDay: 7,
    selected: false,
  },
];
