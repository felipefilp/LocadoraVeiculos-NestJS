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

@Controller('locacao')
export class LocacoesController {
  constructor(private readonly locacaoService: LocacoesService) {}

  @Get('BuscarLocacao/:id')
  async buscarLocacao(@Param('id') id: number): Promise<LocacaoRetornoDto> {
    return this.locacaoService.getLocacaoById(id);
  }

  @Get('BuscarLocacoesPorData')
  async buscarLocacaoPorData(
    @Query() query: BuscarLocacoesPorDataDto,
  ): Promise<LocacaoRetornoDto[]> {
    return this.locacaoService.getLocacoesPorData(
      query.data_inicio,
      query.data_fim,
    );
  }

  @Post('/RealizarLocacao')
  async createLocacao(
    @Body() dados: RealizarLocacaoDto,
  ): Promise<LocacaoRetornoDto> {
    return this.locacaoService.createLocacao(dados);
  }

  @Patch('/AtualizarLocacao/:id')
  async updateLocacao(
    @Param('id') id_locacao: number,
    @Body() AtualizarLocacao: LocacaoAtualizarDto,
  ): Promise<LocacaoRetornoDto> {
    return this.locacaoService.atualizarLocacao(id_locacao, AtualizarLocacao);
  }
}
