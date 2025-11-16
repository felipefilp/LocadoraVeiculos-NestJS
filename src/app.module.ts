import { Module } from '@nestjs/common';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './clientes/cliente.entity';
import { VeiculosModule } from './veiculos/veiculos.module';
import { Veiculo } from './veiculos/veiculo.entity';
import { VendedorModule } from './vendedores/vendedores.module';
import { Vendedor } from './vendedores/vendedor.entity';
import { LocacoesModule } from './locacoes/locacoes.module';
import { Locacao } from './locacoes/locacao.entity';
import { RemessasModule } from './remessas/remessas.module';
import { Remessa } from './remessas/remessa.entity';
import { DevolucoesModule } from './devolucoes/devolucoes.module';
import { Devolucao } from './devolucoes/devolucao.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env/.development.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Cliente, Veiculo, Vendedor, Locacao, Remessa, Devolucao],
        synchronize: true,
      }),
    }),
    ClientesModule,
    VeiculosModule,
    VendedorModule,
    LocacoesModule,
    RemessasModule,
    DevolucoesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
