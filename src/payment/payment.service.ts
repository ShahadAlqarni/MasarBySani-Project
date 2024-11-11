import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
  @InjectRepository(Payment) private paymentsRepo: Repository<Payment>,
){}

  async create(createPaymentDto: CreatePaymentDto) {
    const res = await this.paymentsRepo.save(createPaymentDto);
    return res;
  }

  findAll() {
    const Payments = this.paymentsRepo.find();
return Payments;
   // return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const existingPayment = await this.paymentsRepo.findOneBy({id:id});
    existingPayment.Currency = updatePaymentDto.Currency;
    const updatePayment = await this.paymentsRepo.save(existingPayment);
    return updatePayment
  }

  async remove(id: number) {
    const deletedPayment = await this.paymentsRepo.delete({id});
   // existingPayment.Currency = updatePaymentDto.Currency;
   // const updatePayment = await this.paymentsRepo.save(existingPayment);
    return deletedPayment
     }
}
