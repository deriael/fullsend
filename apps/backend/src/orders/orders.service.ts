// file: apps/backend/src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.prisma.order.create({
      data: {
        customerName: createOrderDto.customerName,
        address: createOrderDto.address,
        phone: createOrderDto.phone,
        paymentMethod: createOrderDto.paymentMethod,
        itemsJson: JSON.stringify(createOrderDto.items),
      },
    });

    return newOrder;
  }

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
