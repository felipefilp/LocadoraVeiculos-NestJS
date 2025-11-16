/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ClienteRetornoDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  cpf: string;

  @ApiProperty()
  @Expose()
  nome: string;

  @ApiProperty()
  @Expose()
  cep: string;

  @ApiProperty()
  @Expose()
  logradouro: string;

  @ApiProperty()
  @Expose()
  numero: number;

  @ApiProperty()
  @Expose()
  cidade: string;

  @ApiProperty()
  @Expose()
  siglaEstado: string;

  @ApiProperty()
  @Expose()
  telefone: string;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  inserted_at: Date;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  updated_at: Date;

  constructor(partial: Partial<ClienteRetornoDto>) {
    Object.assign(this, partial);
  }
}
