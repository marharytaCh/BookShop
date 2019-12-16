import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrderModel } from 'src/models';
import { Order } from 'src/entity';
import { Hash } from 'src/common';
import { OrderRepo } from 'src/repositories';

@Injectable()
export class OrderService {
  constructor(public readonly orderRepo: OrderRepo,
              @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
  ) {}

  public async getAll() {
    const orders = await this.orderRepo.getAll();

    return orders;
  }

  public async createOrder(createOrder: OrderModel): Promise<Order> {
    const order: Order = new Order();
    order.userId = createOrder.userId;
    order.date = createOrder.date;
    order.paymentId = createOrder.paymentId;
    order.id = this.passwordHelper.generateId();

    const savedOrder: Order = await this.orderRepo.createOrder(order);

    return savedOrder;
  }
}
