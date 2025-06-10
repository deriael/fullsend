import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // This endpoint handles CREATING a new order from the checkout page
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // This endpoint handles GETTING all orders for the admin panel
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
