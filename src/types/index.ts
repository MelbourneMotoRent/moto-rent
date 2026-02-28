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
