import { PartialType } from '@nestjs/mapped-types';
import { RealizarLocacaoDto } from './locacao-create.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LocacaoAtualizarDto extends PartialType(RealizarLocacaoDto) {
  @ApiProperty()
  @Expose()
  valor_locacao: number;
}
