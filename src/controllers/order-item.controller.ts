import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderItemService } from 'src/services';
import { OrderItemModel } from 'src/models';
import { CreateOrderItemModel } from 'src/models/order-item/create-order-item.model';
import { OrderItem } from 'sequelize/types';

@ApiUseTags('Items in oreder')
@Controller('orderItems')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @ApiOperation({ title: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.'})
  @Get()
  public async getAll() {
    const orderItems = await this.orderItemService.getAll();

    return orderItems;
  }

  @Post()
  @ApiOperation({ title: 'Create order item'})
  public async create(@Body() createOrderItem: CreateOrderItemModel) {
    const orderItem = await this.orderItemService.addOrderItem(createOrderItem);

    return orderItem;
  }

}
