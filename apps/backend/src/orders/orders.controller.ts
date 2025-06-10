import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService, Order } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // This endpoint handles CREATING a new order from the checkout page
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Order {
    return this.ordersService.create(createOrderDto);
  }

  // This endpoint handles GETTING all orders for the admin panel
  @Get()
  findAll(): Order[] {
    return this.ordersService.findAll();
  }
}
