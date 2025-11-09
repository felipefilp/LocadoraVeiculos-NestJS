import { Module } from '@nestjs/common';
import { VendedorService } from './vendedores.service';
import { VendedorController } from './vendedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedor } from './vendedor.entity';
import { CpfUnico } from 'src/validators/cpf-unico.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Vendedor])],
  controllers: [VendedorController],
  providers: [VendedorService, CpfUnico],
})
export class VendedorModule {}
