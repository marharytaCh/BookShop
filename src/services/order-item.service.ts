import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { OrderItemModel } from 'src/models';
import { Hash } from 'src/common';
import { OrderItemRepo } from 'src/repositories';
import { CreateOrderItemModel } from 'src/models/order-item/create-order-item.model';
import { OrderItem } from 'src/entity';

@Injectable()
export class OrderItemService {

  constructor(
    private readonly orderItemRepo: OrderItemRepo,
    @Inject(forwardRef(() => Hash)) public passwordHelper: Hash,
    ) { }

  public async getAll() {
    const getOrderItems: OrderItem[] = await this.orderItemRepo.getAll();

    return getOrderItems;

  }

  public async addOrderItem(createOrderItem: CreateOrderItemModel) {
    const orderItem = new OrderItem();
    orderItem.id =  this.passwordHelper.generateId();
    orderItem.amount = createOrderItem.amount;
    orderItem.currency = createOrderItem.currency;
    orderItem.pritingEditionId = createOrderItem.pritingEditionId;
    orderItem.orderId = createOrderItem.orderId;
    orderItem.count = createOrderItem.count;

    const saveOrderItem = await this.orderItemRepo.addOrderItem(orderItem);

    return saveOrderItem;
  }
}
