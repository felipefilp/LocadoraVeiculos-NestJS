/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Expose, Transform } from 'class-transformer';
import { Remessa } from 'src/remessas/remessa.entity';

export class DevolucaoRetornoDto {
  @Expose()
  id: number;

  @Expose()
  id_remessa: Remessa;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  data_devolucao: Date;

  @Expose()
  status_devolucao: number;
}
