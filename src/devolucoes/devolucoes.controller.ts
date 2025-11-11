import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { DevolucoesService } from './devolucoes.service';
import { DevolucaoRetornoDto } from './dto/devolucao-create-response.dto';
import { DevolucaoCriarDto } from './dto/devolucao-create.dto';
import { DevolucaoAtualizarDto } from './dto/devolucao-atualizar.dto';

@Controller('devolucoes')
export class DevolucoesController {
  constructor(private DevolucoesService: DevolucoesService) {}

  @Get('BuscarDevolucao/:id')
  async getDevolucao(@Param('id') id: number): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.BuscarDevolucaoById(id);
  }

  @Get('BuscarDevolucoesPorRemessa/:id')
  async getDevolucaoPorRemessa(
    @Param('id') id: number,
  ): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.BuscarDevolucaoByRemessaId(id);
  }

  @Post('CriarDevolucao')
  async criarDevolucao(
    @Body() DevolucaoCriarDto: DevolucaoCriarDto,
  ): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.CriarDevolucao(DevolucaoCriarDto);
  }

  @Patch('AtualizarDevolucao/:id')
  async atualizarDevolucao(
    @Param('id') id: number,
    @Body() DevolucaoAtualizarDto: DevolucaoAtualizarDto,
  ): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.AtualizarDevolucao(id, DevolucaoAtualizarDto);
  }

  @Patch('ConcluirDevolucao/:id')
  async concluirDevolucao(
    @Param('id') id: number,
  ): Promise<DevolucaoRetornoDto> {
    return this.DevolucoesService.ConcluirDevolucao(id);
  }
}
