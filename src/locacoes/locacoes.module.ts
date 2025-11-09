import { Module } from '@nestjs/common';
import { LocacoesController } from './locacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locacao } from './locacao.entity';
import { LocacoesService } from './locacoes.service';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Locacao]), ClientesModule],
  controllers: [LocacoesController],
  providers: [LocacoesService],
})
export class LocacoesModule {}
