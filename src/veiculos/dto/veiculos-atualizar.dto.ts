import { PartialType } from '@nestjs/mapped-types';
import { VeiculoCriarDto } from './veiculos-create.dto';

export class VeiculoAtualizarDto extends PartialType(VeiculoCriarDto) {}
