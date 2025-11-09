import { Expose } from 'class-transformer';

export class LocacaoRetornoDto {
  @Expose()
  id: number;

  @Expose()
  id_cliente: number;

  @Expose()
  status_locacao: number;

  @Expose()
  data_inicio: Date;

  @Expose()
  data_fim: Date;

  @Expose()
  valor_locacao: number;
}
