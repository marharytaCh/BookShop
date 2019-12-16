import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { OrderService } from 'src/services';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common';
import { Order } from 'src/entity';
import { OrderModel } from 'src/models';

@ApiUseTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ title: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.'})
  @Get()
  public async getAll() {
    const orders = await this.orderService.getAll();

    return orders;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Roles('user')
  @ApiOperation({ title: 'Create order'})
  public async create(@Body() createOrder: OrderModel): Promise<Order> {
    const order: Order = await this.orderService.createOrder(createOrder);

    return order;
  }

}
