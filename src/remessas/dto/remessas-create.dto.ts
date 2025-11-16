import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsNumber({}, { message: IsNumberMessage('id_veiculo') })
  @IsNotEmpty({ message: IsUniqueMessage('id_veiculo') })
  @ManyToOne(() => Veiculo, (veiculo) => veiculo.id)
  id_veiculo: Relation<Veiculo>;

  @ApiProperty()
  @IsNumber({}, { message: IsNumberMessage('id_locacao') })
  @IsNotEmpty({ message: IsUniqueMessage('id_locacao') })
  @ManyToOne(() => Locacao, (locacao) => locacao.id)
  id_locacao: Relation<Locacao>;

  @ApiProperty()
  @IsNumber({}, { message: IsNumberMessage('valor_remessa') })
  valor_remessa: number;
}
