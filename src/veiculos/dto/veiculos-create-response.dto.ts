/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Expose, Transform } from 'class-transformer';

export class VeiculoRetornoDto {
  @Expose()
  modelo: string;

  @Expose()
  placa: string;

  @Expose()
  marca: string;

  @Expose()
  valor_base: number;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  inserted_at: Date;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  updated_at: Date;

  constructor(partial: Partial<VeiculoRetornoDto>) {
    Object.assign(this, partial);
  }
}
