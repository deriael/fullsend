// file: apps/backend/src/vehicles/vehicles.service.ts
import { Injectable } from '@nestjs/common';
import { Vehicle, Model } from '@fullsend/types';
import * as vehiclesDataJson from '../data/vehicles.json';

// This assertion tells TypeScript to trust that the JSON data
// matches the shape of our Vehicle[] type, making our code safe.
const vehiclesData: Vehicle[] = vehiclesDataJson as Vehicle[];

@Injectable()
export class VehiclesService {
  // We explicitly state the function's return type.
  findAllMakes(): string[] {
    return vehiclesData.map((vehicle) => vehicle.make);
  }

  // We explicitly state the function's return type.
  findModelsByMake(make: string): Model[] {
    const vehicle = vehiclesData.find(
      (v) => v.make.toLowerCase() === make.toLowerCase(),
    );
    return vehicle ? vehicle.models : [];
  }
}
