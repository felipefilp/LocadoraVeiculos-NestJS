import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculoRetornoDto } from './dto/veiculos-create-response.dto';
import { VeiculoCriarDto } from './dto/veiculos-create.dto';
import { VeiculoAtualizarDto } from './dto/veiculos-atualizar.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Veiculo')
@Controller('veiculo')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Get('BuscarVeiculo/:placa')
  @ApiOperation({ summary: 'Lista o veículo pela placa.' })
  @ApiResponse({ status: 200, description: 'Veículo localizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Veículo não localizado' })
  findOne(@Param('placa') placa: string): Promise<VeiculoRetornoDto> {
    return this.veiculosService.findOneVeiculoByPlaca(placa);
  }

  @Get('BuscarTodosVeiculos')
  @ApiOperation({ summary: 'Lista todos os veículos.' })
  @ApiResponse({ status: 200 })
  async findAll(): Promise<VeiculoRetornoDto[]> {
    return this.veiculosService.findAllVeiculos();
  }

  @Post('CriarVeiculo')
  @ApiOperation({ summary: 'Criar um veículo.' })
  @ApiResponse({ status: 200 })
  async createVeiculo(
    @Body() VeiculoCriarDto: VeiculoCriarDto,
  ): Promise<VeiculoRetornoDto> {
    return await this.veiculosService.createVeiculo(VeiculoCriarDto);
  }

  @Patch('AtualizarVeiculo/:placa')
  @ApiOperation({ summary: 'Atualizar veiculo por placa.' })
  @ApiResponse({ status: 200, description: 'Veículo atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Veículo não localizado.' })
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
