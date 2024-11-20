import { Controller, Get, Post, Query, Req, Request, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenPayload } from './auth/types/AccessTokenPayload';
import { User } from './auth/decorators/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('') // it defines http get request
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/find-sum')
  findsum(@Query('num1')num1: string, @Req() Req, @Res() res){
    res.send('78');
    const sum = Number(num1);
    return {total:sum};
  }
}
