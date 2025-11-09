import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VeiculoCriarDto {
  @IsNotEmpty({ message: 'O modelo é obrigatório.' })
  @IsString()
  modelo: string;

  @IsNotEmpty({ message: 'A marca é obrigatória.' })
  @IsString()
  marca: string;

  @IsNotEmpty({ message: 'A placa é obrigatória.' })
  @IsString()
  placa: string;

  @IsNumber()
  valor_base: number;
}
