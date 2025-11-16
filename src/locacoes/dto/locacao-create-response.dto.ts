import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class LocacaoRetornoDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  id_cliente: number;

  @ApiProperty()
  @Expose()
  status_locacao: number;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  data_inicio: Date;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  data_fim: Date;

  @ApiProperty()
  @Expose()
  valor_locacao: number;
}
