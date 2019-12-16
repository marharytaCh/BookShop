import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/entity';
import database = require('src/entity');

@Injectable()
export class OrderItemRepo {
  public async getAll(): Promise<OrderItem[]> {
    const getOrderItems: OrderItem[] = await database.OrderItem.findAll();

    return getOrderItems;
  }
  public async addOrderItem(createOrderItem: OrderItem): Promise<OrderItem> {
    const orderItem: OrderItem = await createOrderItem.save();

    return orderItem;
  }
}
