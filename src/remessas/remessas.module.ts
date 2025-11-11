import { Module } from '@nestjs/common';
import { RemessasService } from './remessas.service';
import { RemessasController } from './remessas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Remessa } from './remessa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Remessa])],
  controllers: [RemessasController],
  providers: [RemessasService],
})
export class RemessasModule {}
