import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LocacoesService } from './locacoes.service';
import { RealizarLocacaoDto } from './dto/locacao-create.dto';
import { LocacaoRetornoDto } from './dto/locacao-create-response.dto';
import { LocacaoAtualizarDto } from './dto/locacao-atualizar.dto';
import { BuscarLocacoesPorDataDto } from './dto/locacao-buscardata-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Locação')
@Controller('locacao')
export class LocacoesController {
  constructor(private readonly locacaoService: LocacoesService) {}

  @Get('BuscarLocacao/:id')
  @ApiOperation({ summary: 'Lista locação por Id.' })
  @ApiResponse({
    status: 200,
    description: 'Locação localizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Locação não localizada.',
  })
  async buscarLocacao(@Param('id') id: number): Promise<LocacaoRetornoDto> {
    return this.locacaoService.getLocacaoById(id);
  }

  @Get('BuscarTodasLocacoes')
  @ApiOperation({ summary: 'Lista todas as locações.' })
  @ApiResponse({
    status: 200,
  })
  async buscarTodasLocacoes(): Promise<LocacaoRetornoDto[]> {
    return this.locacaoService.getAllLocacoes();
  }

  @Get('BuscarLocacoesPorData')
  @ApiOperation({ summary: 'Lista locações por data inicial e final.' })
  @ApiResponse({
    status: 200,
    description: 'Locações localizadas com sucesso.',
  })
  @ApiResponse({
    status: 406,
    description: 'Data inicial informada é maior que a data final.',
  })
  async buscarLocacaoPorData(
    @Query() query: BuscarLocacoesPorDataDto,
  ): Promise<LocacaoRetornoDto[]> {
    return this.locacaoService.getLocacoesPorData(
      query.data_inicio,
      query.data_fim,
    );
  }

  @Patch('ConcluirLocacao/:id')
  @ApiOperation({ summary: 'Concluir locação.' })
  @ApiResponse({
    status: 200,
    description: 'Locações concluida com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Remessa ou Devolução não estão concluidas (status = 1)',
  })
  @ApiResponse({
    status: 404,
    description: 'Locação não localizada',
  })
  async concluirLocacao(@Param('id') id: number): Promise<LocacaoRetornoDto> {
    return this.locacaoService.concluirLocacao(id);
  }

  @Post('/RealizarLocacao')
  @ApiOperation({ summary: 'Criar locação.' })
  @ApiResponse({
    status: 200,
    description: 'Locações criada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não localizado.',
  })
  async createLocacao(
    @Body() dados: RealizarLocacaoDto,
  ): Promise<LocacaoRetornoDto> {
    return this.locacaoService.createLocacao(dados);
  }

  @Patch('/AtualizarLocacao/:id')
  @ApiOperation({ summary: 'Atualizar locação por Id.' })
  @ApiResponse({
    status: 200,
    description: 'Locações atualizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Locação não localizada.',
  })
  async updateLocacao(
    @Param('id') id_locacao: number,
    @Body() AtualizarLocacao: LocacaoAtualizarDto,
  ): Promise<LocacaoRetornoDto> {
    return this.locacaoService.atualizarLocacao(id_locacao, AtualizarLocacao);
  }
}
