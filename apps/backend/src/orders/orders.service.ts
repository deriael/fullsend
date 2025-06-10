import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

export interface Order {
  id: string;
  createdAt: Date;
  customerName: string;
  address: string;
  phone: string;
  paymentMethod: string;
  itemsJson: string;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  create(createOrderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: (this.orders.length + 1).toString(),
      createdAt: new Date(),
      customerName: createOrderDto.customerName,
      address: createOrderDto.address,
      phone: createOrderDto.phone,
      paymentMethod: createOrderDto.paymentMethod,
      itemsJson: JSON.stringify(createOrderDto.items),
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  findAll(): Order[] {
    return this.orders;
  }
}
