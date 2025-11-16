import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  IsNumberMessage,
  IsStringMessage,
  IsUniqueMessage,
} from 'src/validators/message.validator';

export class VeiculoCriarDto {
  @ApiProperty()
  @IsNotEmpty({ message: IsUniqueMessage('modelo') })
  @IsString({ message: IsStringMessage('modelo') })
  modelo: string;

  @ApiProperty()
  @IsNotEmpty({ message: IsUniqueMessage('marca') })
  @IsString({ message: IsStringMessage('marca') })
  marca: string;

  @ApiProperty()
  @IsNotEmpty({ message: IsUniqueMessage('placa') })
  @IsString({ message: IsStringMessage('placa') })
  placa: string;

  @ApiProperty()
  @IsNumber({}, { message: IsNumberMessage('valor_base') })
  valor_base: number;
}
