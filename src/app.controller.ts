import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCatDto } from './create-cat.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:name/:age')
  @UsePipes(new ValidationPipe())
  async create(@Param() createCatDto: CreateCatDto) {
    return this.appService.getHello() + createCatDto.age;
  }
}
