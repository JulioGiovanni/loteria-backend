import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoteriaService } from './loteria.service';

@Controller('loteria')
export class LoteriaController {
  constructor(private readonly loteriaService: LoteriaService) {}

  @Post()
  create(@Body() body: number) {
    return this.loteriaService.create(body);
  }

  @Get()
  findAll() {
    return this.loteriaService.findAll();
  }

  @Get('seed')
  seed() {
    return this.loteriaService.seed();
  }
}
