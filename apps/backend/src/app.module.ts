import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { PartsModule } from './parts/parts.module';
import { OrdersModule } from './orders/orders.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [VehiclesModule, PartsModule, OrdersModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
