import { Expose, Transform } from 'class-transformer';

export class DevolucaoRetornoDto {
  @Expose()
  id_remessa: number;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  data_devolucao: Date;

  @Expose()
  status_devolucao: number;
}
