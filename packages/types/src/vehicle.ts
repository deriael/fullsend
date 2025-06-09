// packages/types/src/vehicle.ts
export interface Engine {
  type: string; // e.g., '1.9 TDI', '2.0 TFSI'
  horsepower: number;
}

export interface Model {
  name: string; // e.g., 'A4', 'Golf'
  years: number[];
  engines: Engine[];
}

export interface Vehicle {
  make: string; // e.g., 'Audi', 'Volkswagen'
  models: Model[];
}
