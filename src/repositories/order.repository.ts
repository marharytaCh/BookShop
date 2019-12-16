import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity';
import database = require('src/entity');

@Injectable()
export class OrderRepo {

  public async getAll() {
    const orders =  await database.Order.findAll();

    return orders;
  }
  public async createOrder(createOrder: Order): Promise<Order> {
    const order: Order = await createOrder.save();

    return order;
  }
}
