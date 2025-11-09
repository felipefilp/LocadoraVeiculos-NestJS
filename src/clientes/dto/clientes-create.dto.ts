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

export class ClienteCriarDto {
  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @IsString()
  @Length(11, 11, { message: 'O CPF tem que possuir 11 digitos.' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter apenas números.' })
  @IsCpfUnico(Cliente, {
    message: 'Já existe um cliente cadastrado com este CPF.',
  })
  cpf: string;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' })
  nome: string;

  @IsString()
  @IsPostalCode('BR', { message: 'O CEP informado não é válido.' })
  cep: string;

  @IsNotEmpty({ message: 'O logradouro é obrigatório.' })
  @IsString()
  logradouro: string;

  @IsNotEmpty({ message: 'O número é obrigatório.' })
  @IsNumber({}, { message: 'O número deve ser um valor númerico.' })
  numero: number;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString()
  cidade: string;

  @IsNotEmpty({ message: 'A sigla do estado é obrigatória.' })
  @IsString()
  @Length(2, 2, {
    message: 'A sigla do estado deve possuir apenas 2 caracteres.',
  })
  siglaEstado: string;

  @IsOptional()
  @IsString({
    message: 'Favor preencher o telefone/celular apenas com os números',
  })
  @Matches(/^\d{10,11}$/, {
    message:
      'O telefone deve ter 10 ou 11 dígitos (DDD + número, somente números).',
  })
  telefone: string;
}
