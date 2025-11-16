import { PartialType } from '@nestjs/mapped-types';
import { RealizarLocacaoDto } from './locacao-create.dto';
import { Expose } from 'class-transformer';

export class LocacaoAtualizarDto extends PartialType(RealizarLocacaoDto) {
  @Expose()
  valor_locacao: number;
}
