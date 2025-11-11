import { Expose, Transform } from 'class-transformer';

export class LocacaoRetornoDto {
  @Expose()
  id: number;

  @Expose()
  id_cliente: number;

  @Expose()
  status_locacao: number;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  data_inicio: Date;

  @Expose()
  @Transform(({ value }) =>
    value ? new Date(value).toLocaleString('pt-BR', { hour12: false }) : null,
  )
  data_fim: Date;

  @Expose()
  valor_locacao: number;
}
