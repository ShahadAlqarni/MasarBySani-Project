import { Body, Controller, Get,Param,Post, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { query } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/find-sum')
  findsum(@Query('num1')num1: string, @Req() Req, @Res() res){
    res.send('78');
    const sum = Number(num1);
    return {total:sum};
  }
   
  @Post('/hello')
  postHello(@Body('name') name:string, @Req() req, @Res()  res ){
    //res.send(this.appService.getHello())
    res.send(req.Body);
   // return query;
  }
}
