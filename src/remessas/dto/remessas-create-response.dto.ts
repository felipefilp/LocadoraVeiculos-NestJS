/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Expose, Transform } from 'class-transformer';

export class RemessaRetornoDto {
  @Expose()
  id: number;

  @Expose()
  status_locacao: number;

  @Expose()
  valor_remessa: number;

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
}
