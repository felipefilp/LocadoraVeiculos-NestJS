import { Module } from '@nestjs/common';
import { DevolucoesController } from './devolucoes.controller';
import { DevolucoesService } from './devolucoes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devolucao } from './devolucao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Devolucao])],
  controllers: [DevolucoesController],
  providers: [DevolucoesService],
  exports: [DevolucoesService],
})
export class DevolucoesModule {}
