// packages/types/src/part.ts
export interface Part {
  id: string; // A unique ID for this part listing
  partNumber: string; // The universal part number (e.g., ATE-456)
  name: string;
  description: string;
  imageUrl: string;
  brand: string;
  price: number; // Final, marked-up price for the customer
  stockStatus: "Na stanju" | "Nema na stanju" | "Proveriti dostupnost";
}
