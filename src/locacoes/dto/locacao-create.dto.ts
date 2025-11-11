import { IsNotEmpty } from 'class-validator';
import { Cliente } from 'src/clientes/cliente.entity';
import { IsUniqueMessage } from 'src/validators/message.validator';
import { ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';

export class RealizarLocacaoDto {
  @IsNotEmpty({ message: IsUniqueMessage('id_cliente') })
  @ManyToOne(() => Cliente, (cliente) => cliente.id)
  id_cliente: Relation<Cliente>;
}
