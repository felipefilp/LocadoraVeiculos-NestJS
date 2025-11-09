import { PartialType } from '@nestjs/mapped-types';
import { RealizarLocacaoDto } from './locacao-create.dto';

export class LocacaoAtualizarDto extends PartialType(RealizarLocacaoDto) {}
