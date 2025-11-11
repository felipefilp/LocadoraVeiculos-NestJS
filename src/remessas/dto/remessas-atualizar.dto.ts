import { PartialType } from '@nestjs/mapped-types';
import { RemessaCriarDto } from './remessas-create.dto';

export class RemessaAtualizarDto extends PartialType(RemessaCriarDto) {}
