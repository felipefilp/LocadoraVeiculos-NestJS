import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { IsCpfUnico } from 'src/validators/cpf-unico.validator';
import { Vendedor } from '../vendedor.entity';
import {
  IsCPFUnicoMessage,
  IsStringMessage,
  IsUniqueMessage,
  LengthMessage,
} from 'src/validators/message.validator';
import { ApiProperty } from '@nestjs/swagger';

export class VendedorCriarDto {
  @ApiProperty()
  @IsNotEmpty({ message: IsUniqueMessage('nome') })
  @IsString({ message: IsStringMessage('nome') })
  @Length(3, 100, { message: LengthMessage('cpf', 3, 100) })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: IsUniqueMessage('cpf') })
  @IsString({ message: IsStringMessage('cpf') })
  @Length(11, 11, { message: LengthMessage('cpf', 11, 11) })
  @IsCpfUnico(Vendedor, {
    message: IsCPFUnicoMessage('vendedor'),
  })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter apenas números.' })
  cpf: string;
}
