import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '../prisma.service'; // <-- IMPORT PrismaService

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService], // <-- ADD PrismaService HERE
})
export class OrdersModule {}
