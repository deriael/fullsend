// file: apps/backend/src/vehicles/vehicles.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Model } from '@fullsend/types'; // Import Model type

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  findAllMakes(): string[] {
    // Add explicit return type
    return this.vehiclesService.findAllMakes();
  }

  @Get(':make/models')
  findModelsByMake(@Param('make') make: string): Model[] {
    // Add explicit return type
    return this.vehiclesService.findModelsByMake(make);
  }
}
