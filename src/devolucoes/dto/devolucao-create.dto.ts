import { IsNotEmpty, IsNumber } from 'class-validator';
import { Remessa } from 'src/remessas/remessa.entity';
import {
  IsNumberMessage,
  IsUniqueMessage,
} from 'src/validators/message.validator';
import { OneToOne } from 'typeorm';
import type { Relation } from 'typeorm';

export class DevolucaoCriarDto {
  @IsNumber({}, { message: IsNumberMessage('id_remessa') })
  @IsNotEmpty({ message: IsUniqueMessage('id_remessa') })
  @OneToOne(() => Remessa, (remessa) => remessa.id)
  id_remessa: Relation<Remessa>;
}
