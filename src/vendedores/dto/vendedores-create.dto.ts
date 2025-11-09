import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { IsCpfUnico } from 'src/validators/cpf-unico.validator';
import { Vendedor } from '../vendedor.entity';

export class VendedorCriarDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString()
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' })
  nome: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @IsString()
  @Length(11, 11, { message: 'O CPF tem que possuir 11 digitos.' })
  @IsCpfUnico(Vendedor, {
    message: 'Já existe um vendedor cadastrado com este CPF.',
  })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter apenas números.' })
  cpf: string;
}
