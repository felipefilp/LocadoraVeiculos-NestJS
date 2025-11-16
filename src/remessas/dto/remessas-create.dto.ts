import { IsNotEmpty, IsNumber } from 'class-validator';
import { Locacao } from 'src/locacoes/locacao.entity';
import {
  IsNumberMessage,
  IsUniqueMessage,
} from 'src/validators/message.validator';
import { Veiculo } from 'src/veiculos/veiculo.entity';
import { ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';

export class RemessaCriarDto {
  @IsNumber({}, { message: IsNumberMessage('id_veiculo') })
  @IsNotEmpty({ message: IsUniqueMessage('id_veiculo') })
  @ManyToOne(() => Veiculo, (veiculo) => veiculo.id)
  id_veiculo: Relation<Veiculo>;

  @IsNumber({}, { message: IsNumberMessage('id_locacao') })
  @IsNotEmpty({ message: IsUniqueMessage('id_locacao') })
  @ManyToOne(() => Locacao, (locacao) => locacao.id)
  id_locacao: Relation<Locacao>;

  @IsNumber({}, { message: IsNumberMessage('valor_remessa') })
  valor_remessa: number;
}
