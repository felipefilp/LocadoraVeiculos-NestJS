import { Module } from '@nestjs/common';
import { RemessasService } from './remessas.service';
import { RemessasController } from './remessas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remessa } from './remessa.entity';
import { Locacao } from 'src/locacoes/locacao.entity';
import { Veiculo } from 'src/veiculos/veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remessa, Locacao, Veiculo])],
  controllers: [RemessasController],
  providers: [RemessasService],
  exports: [RemessasService],
})
export class RemessasModule {}
