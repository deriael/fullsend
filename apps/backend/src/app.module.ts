import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [VehiclesModule, PartsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
