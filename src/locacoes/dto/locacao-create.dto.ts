import { IsNotEmpty } from 'class-validator';
import { Cliente } from 'src/clientes/cliente.entity';
import { ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';

export class RealizarLocacaoDto {
  @IsNotEmpty()
  @ManyToOne(() => Cliente, (cliente) => cliente.id)
  id_cliente: Relation<Cliente>;
}
