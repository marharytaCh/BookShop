import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entity';
import database = require('src/entity');

@Injectable()
export class PaymentRepo {
  public async getAll(): Promise<Payment[]> {
    const payments: Payment[] = await database.Payment.findAll();

    return payments;
  }

  public async getById(id: string): Promise<Payment> {
    const payment: Payment = await database.Payment.findOne({
      where: {id},
    });

    return payment;
  }

  public async create(addPayment: Payment): Promise<Payment> {
    const newPayment: Payment = await addPayment.save();

    return newPayment;
  }

  public async delete(id: string): Promise<number> {
    const deletedPayment: number = await database.Payment.destroy({
      where: {id},
    });

    return deletedPayment;
  }
}
