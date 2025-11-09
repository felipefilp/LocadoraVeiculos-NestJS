import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './clientes/cliente.entity';
import { VeiculosModule } from './veiculos/veiculos.module';
import { Veiculo } from './veiculos/veiculo.entity';
import { VendedorModule } from './vendedores/vendedores.module';
import { Vendedor } from './vendedores/vendedor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'locadora@5463',
      database: 'postgres',
      entities: [Cliente, Veiculo, Vendedor],
      synchronize: true,
    }),
    ClientesModule,
    VeiculosModule,
    VendedorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
