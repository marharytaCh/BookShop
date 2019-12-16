import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PaymentRepo } from 'src/repositories';
import { Payment } from 'src/entity';
import { PaymentModel } from 'src/models/payment/payment.model';
import { Hash } from 'src/common';
import { Environment, environment } from 'src/environment';
const env: Environment = environment();

@Injectable()
export class PaymentService {

  constructor(private readonly paymentRepo: PaymentRepo,
              @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
              ) { }

  public async getAll(): Promise<Payment[]> {
    const payments: Payment[] = await this.paymentRepo.getAll();

    return payments;
  }

  public async getById(paymentId: string): Promise<Payment> {
    const payment: Payment = await this.paymentRepo.getById(paymentId);

    return payment;
  }

  public async createPayment(paymentModel: PaymentModel): Promise<Payment> {
    const createPayment: Payment = new Payment();
    createPayment.id = this.passwordHelper.generateId();
    createPayment.transactionId = await this.charge(paymentModel);

    const newPayment = await this.paymentRepo.create(createPayment);

    return newPayment;
  }

  public async charge(paymentModel: PaymentModel): Promise<string> {
    const status: string = 'succeeded';
    const messege: string = 'Error';
    const stripe = require('stripe')(env.stripePrivatKey);
    const customer = await stripe.customers.create({
          email: paymentModel.email,
          source: paymentModel.source,
        });
    console.log('charge customer', customer)
    const charge = await stripe.charges.create({
      amount: paymentModel.amount,
      currency: paymentModel.currency,
      customer: customer.id,
    });
    console.log('charge', charge)
    console.log('charge status', charge.status)

    if (charge.status === status) {
      const balanceTransactionId: string = charge.id;

      return balanceTransactionId;
    }

    return messege;
  }

  public async delete(paymentId: string): Promise<number> {
    const deletedPayment: number = await this.paymentRepo.delete(paymentId);

    return deletedPayment;
  }

}
