import { PartialType } from '@nestjs/mapped-types';
import { ClienteCriarDto } from './clientes-create.dto';

export class ClientesAtualizarDto extends PartialType(ClienteCriarDto) {}
