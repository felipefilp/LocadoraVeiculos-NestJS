/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Remessa } from 'src/remessas/remessa.entity';

export class DevolucaoRetornoDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  id_remessa: Remessa;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  data_devolucao: Date;

  @ApiProperty()
  @Expose()
  status_devolucao: number;
}
