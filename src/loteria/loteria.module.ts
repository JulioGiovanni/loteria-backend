import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteriaService } from './loteria.service';
import { LoteriaController } from './loteria.controller';
import { Cartas } from './entities/cartas.entity';
import { Tablas } from './entities/tablas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cartas, Tablas])],
  controllers: [LoteriaController],
  providers: [LoteriaService],
})
export class LoteriaModule {}
