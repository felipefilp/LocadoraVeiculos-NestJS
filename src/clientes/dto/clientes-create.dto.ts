/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { IsCpfUnico } from '../../validators/cpf-unico.validator';
import { Cliente } from '../cliente.entity';
import {
  IsCPFUnicoMessage,
  IsStringMessage,
  IsUniqueMessage,
  LengthMessage,
  TelefoneMessage,
} from 'src/validators/message.validator';

export class ClienteCriarDto {
  @IsNotEmpty({ message: IsUniqueMessage('cpf') })
  @IsString({ message: IsStringMessage('cpf') })
  @Length(11, 11, { message: LengthMessage('cpf', 11, 11) })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter apenas números.' })
  @IsCpfUnico(Cliente, {
    message: IsCPFUnicoMessage('cliente'),
  })
  cpf: string;

  @IsNotEmpty({ message: IsUniqueMessage('nome') })
  @IsString({ message: IsStringMessage('nome') })
  @Length(3, 100, { message: LengthMessage('nome', 3, 100) })
  nome: string;

  @IsString({ message: IsStringMessage('cep') })
  @IsPostalCode('BR', { message: 'O CEP informado não é válido.' })
  cep: string;

  @IsNotEmpty({ message: IsUniqueMessage('logradouro') })
  @IsString({ message: IsStringMessage('logradouro') })
  logradouro: string;

  @IsNotEmpty({ message: IsUniqueMessage('numero') })
  @IsNumber({}, { message: 'O número deve ser um valor númerico.' })
  numero: number;

  @IsNotEmpty({ message: IsUniqueMessage('cidade') })
  @IsString({ message: IsStringMessage('cidade') })
  cidade: string;

  @IsNotEmpty({ message: IsUniqueMessage('siglaEstado') })
  @IsString({ message: IsStringMessage('siglaEstado') })
  @Length(2, 2, {
    message: LengthMessage('siglaEstado', 2, 2),
  })
  siglaEstado: string;

  @IsOptional()
  @IsString({
    message: IsStringMessage('telefone'),
  })
  @Matches(/^\d{10,11}$/, {
    message: TelefoneMessage(),
  })
  telefone: string;
}
