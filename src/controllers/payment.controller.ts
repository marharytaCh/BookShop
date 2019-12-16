import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from 'src/services';
import { PaymentModel } from 'src/models/payment/payment.model';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common';
import { Payment } from 'src/entity';

@ApiUseTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiOperation({ title: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'Return all books.'})
  @Get()
  public async getAll() {
    const payments = await this.paymentService.getAll();

    return payments;
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    const payment = await this.paymentService.getById(id);

    return payment;
  }

  @ApiOperation({ title: 'Create payment' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Roles('user')
  public async create(@Body() paymentModel: PaymentModel) {
    console.log('pay', paymentModel)
    const payment: Payment = await this.paymentService.createPayment(paymentModel);

    return payment;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const deletedPayment = await this.paymentService.delete(id);

    return deletedPayment;
  }
}
