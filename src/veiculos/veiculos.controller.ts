import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculoRetornoDto } from './dto/veiculos-create-response.dto';
import { VeiculoCriarDto } from './dto/veiculos-create.dto';
import { VeiculoAtualizarDto } from './dto/veiculos-atualizar.dto';

@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Get('BuscarVeiculo/:placa')
  findOne(@Param('placa') placa: string): Promise<VeiculoRetornoDto> {
    return this.veiculosService.findOneVeiculoByPlaca(placa);
  }

  @Get('BuscarTodosVeiculos')
  async findAll(): Promise<VeiculoRetornoDto[]> {
    return this.veiculosService.findAllVeiculos();
  }

  @Post('CriarVeiculo')
  async createVeiculo(
    @Body() VeiculoCriarDto: VeiculoCriarDto,
  ): Promise<VeiculoRetornoDto> {
    return await this.veiculosService.createVeiculo(VeiculoCriarDto);
  }

  @Patch('AtualizarVeiculo/:placa')
  async updateVeiculo(
    @Param('placa') placa: string,
    @Body() dados: VeiculoAtualizarDto,
  ): Promise<VeiculoRetornoDto> {
    const VeiculoAtualizado = await this.veiculosService.updateVeiculo(
      placa,
      dados,
    );
    return new VeiculoRetornoDto(VeiculoAtualizado);
  }
}
