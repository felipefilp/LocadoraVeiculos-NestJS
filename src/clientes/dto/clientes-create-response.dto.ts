/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose, Transform } from 'class-transformer';

export class ClienteRetornoDto {
  @Expose()
  id: number;

  @Expose()
  cpf: string;

  @Expose()
  nome: string;

  @Expose()
  cep: string;

  @Expose()
  logradouro: string;

  @Expose()
  numero: number;

  @Expose()
  cidade: string;

  @Expose()
  siglaEstado: string;

  @Expose()
  telefone: string;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  insertedAt: Date;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  updatedAt: Date;

  constructor(partial: Partial<ClienteRetornoDto>) {
    Object.assign(this, partial);
  }
}
