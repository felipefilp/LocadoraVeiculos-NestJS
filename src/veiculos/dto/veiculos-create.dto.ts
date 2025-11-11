import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  IsNumberMessage,
  IsStringMessage,
  IsUniqueMessage,
} from 'src/validators/message.validator';

export class VeiculoCriarDto {
  @IsNotEmpty({ message: IsUniqueMessage('modelo') })
  @IsString({ message: IsStringMessage('modelo') })
  modelo: string;

  @IsNotEmpty({ message: IsUniqueMessage('marca') })
  @IsString({ message: IsStringMessage('marca') })
  marca: string;

  @IsNotEmpty({ message: IsUniqueMessage('placa') })
  @IsString({ message: IsStringMessage('placa') })
  placa: string;

  @IsNumber({}, { message: IsNumberMessage('valor_base') })
  valor_base: number;
}
