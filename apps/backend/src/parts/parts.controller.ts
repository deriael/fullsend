// file: apps/backend/src/parts/parts.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { PartsService } from './parts.service';
import { Part } from '@fullsend/types'; // Import Part type

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get()
  findAll(
    @Query('model') model: string,
    @Query('year') year: string,
    @Query('engine') engine: string,
  ): Part[] {
    // Add explicit return type
    return this.partsService.findAll({ model, year, engine });
  }
}
