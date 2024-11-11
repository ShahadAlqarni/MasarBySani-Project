import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  //constructor(paymentService: PaymentService){}
  getHello(): string {
    return 'Hello World!';
  }
}
