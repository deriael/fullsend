// file: apps/backend/src/vehicles/vehicles.service.ts
import { Injectable } from '@nestjs/common';
import { Vehicle, Model } from '@fullsend/types'; // Import our types
import * as vehiclesDataJson from '../data/vehicles.json';

// This "assertion" tells TypeScript to trust us that the JSON data
// perfectly matches the shape of our Vehicle[] type.
const vehiclesData: Vehicle[] = vehiclesDataJson as Vehicle[];

@Injectable()
export class VehiclesService {
  // We explicitly state this function returns an array of strings.
  findAllMakes(): string[] {
    // Now TypeScript knows `vehicle` is a `Vehicle` and has a `make` property.
    return vehiclesData.map((vehicle) => vehicle.make);
  }

  // We explicitly state this function returns an array of Models.
  findModelsByMake(make: string): Model[] {
    // Now TypeScript knows `v` is a `Vehicle` and has `make` and `models` properties.
    const vehicle = vehiclesData.find(
      (v) => v.make.toLowerCase() === make.toLowerCase(),
    );
    // The return value is guaranteed to be Model[] or an empty array, which is safe.
    return vehicle ? vehicle.models : [];
  }
}
