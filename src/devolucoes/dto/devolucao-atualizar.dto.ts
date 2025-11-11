import { PartialType } from '@nestjs/mapped-types';
import { DevolucaoCriarDto } from './devolucao-create.dto';

export class DevolucaoAtualizarDto extends PartialType(DevolucaoCriarDto) {}
