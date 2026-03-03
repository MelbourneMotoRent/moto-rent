export type TransmissionType = "Automatic" | "Manual";
export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";
export type CarCategory = "Economy" | "Compact" | "SUV" | "Luxury" | "Van" | "Sports";

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  seats: number;
  transmission: TransmissionType;
  fuel: FuelType;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
  available: boolean;
  rating: number;
  reviewCount: number;
}

export interface FilterState {
  category: CarCategory | "All";
  maxPrice: number;
  transmission: TransmissionType | "All";
  minSeats: number;
}

export interface SearchState {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  rentalDays: number;
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  selected: boolean;
}

export interface PriceBreakdown {
  dailyRate: number;
  rentalDays: number;
  basePrice: number;
  discountLabel: string;
  discountPct: number;
  discountAmount: number;
  addonsTotal: number;
  subtotal: number;
  gst: number;
  total: number;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  dateOfBirth: string;
  search: SearchState;
  car: Car;
  addons: AddonItem[];
  price: PriceBreakdown;
}
