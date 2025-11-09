import { PartialType } from '@nestjs/mapped-types';
import { VendedorCriarDto } from './vendedores-create.dto';

export class VendedorAtualizarDto extends PartialType(VendedorCriarDto) {}
