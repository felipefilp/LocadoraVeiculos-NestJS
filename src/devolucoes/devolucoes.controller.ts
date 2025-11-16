import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { DevolucoesService } from './devolucoes.service';
import { DevolucaoRetornoDto } from './dto/devolucao-create-response.dto';
import { DevolucaoCriarDto } from './dto/devolucao-create.dto';
import { DevolucaoAtualizarDto } from './dto/devolucao-atualizar.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Devolução')
@Controller('devolucao')
export class DevolucoesController {
  constructor(private DevolucoesService: DevolucoesService) {}

  @Get('BuscarDevolucao/:id')
  @ApiOperation({ summary: 'Lista devolução por Id.' })
  @ApiResponse({
    status: 200,
    description: 'Devolução localizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Devolução não localizado.',
  })
  async getDevolucao(@Param('id') id: number): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.BuscarDevolucaoById(id);
  }

  @Get('BuscarDevolucaoPorRemessa/:id')
  @ApiOperation({ summary: 'Lista devolução por Id da Remessa.' })
  @ApiResponse({
    status: 200,
    description: 'Devolução localizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Devolução / Remessa não localizada.',
  })
  async getDevolucaoPorRemessa(
    @Param('id') id: number,
  ): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.BuscarDevolucaoByRemessaId(id);
  }

  @Post('CriarDevolucao')
  @ApiOperation({ summary: 'Criar devolução.' })
  @ApiResponse({
    status: 200,
    description: 'Devolução criada com sucesso.',
  })
  async criarDevolucao(
    @Body() DevolucaoCriarDto: DevolucaoCriarDto,
  ): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.CriarDevolucao(DevolucaoCriarDto);
  }

  @Patch('AtualizarDevolucao/:id')
  @ApiOperation({ summary: 'Atualizar devolução por Id.' })
  @ApiResponse({
    status: 200,
    description: 'Devolução atualizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Devolução não localizada.',
  })
  async atualizarDevolucao(
    @Param('id') id: number,
    @Body() DevolucaoAtualizarDto: DevolucaoAtualizarDto,
  ): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.AtualizarDevolucao(id, DevolucaoAtualizarDto);
  }

  @Patch('ConcluirDevolucao/:id')
  @ApiOperation({ summary: 'Concluir devolução.' })
  @ApiResponse({
    status: 200,
    description: 'Devolução concluida com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Remessa não estão concluidas (status = 1)',
  })
  @ApiResponse({
    status: 404,
    description: 'Locação não localizada',
  })
  async concluirDevolucao(
    @Param('id') id: number,
  ): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.ConcluirDevolucao(id);
  }
}
