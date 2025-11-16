/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class VeiculoRetornoDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  modelo: string;

  @ApiProperty()
  @Expose()
  placa: string;

  @ApiProperty()
  @Expose()
  marca: string;

  @ApiProperty()
  @Expose()
  valor_base: number;

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

  constructor(partial: Partial<VeiculoRetornoDto>) {
    Object.assign(this, partial);
  }
}
