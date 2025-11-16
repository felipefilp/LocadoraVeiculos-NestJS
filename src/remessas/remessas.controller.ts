import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RemessasService } from './remessas.service';
import { RemessaRetornoDto } from './dto/remessas-create-response.dto';
import { RemessaCriarDto } from './dto/remessas-create.dto';
import { RemessaAtualizarDto } from './dto/remessas-atualizar.dto';

@Controller('remessa')
export class RemessasController {
  constructor(private readonly RemessaService: RemessasService) {}

  @Get('BuscarRemessa/:id')
  async findRemessaById(@Param('id') id: number): Promise<RemessaRetornoDto> {
    return this.RemessaService.BuscarRemessaPorIdRemessa(id);
  }

  @Get('BuscarRemessasPorLocacaoId/:id')
  async findRemessaByLocacaoId(
    @Param('id') id_locacao: number,
  ): Promise<RemessaRetornoDto[]> {
    return this.RemessaService.BuscarRemessaPorIdLocacao(id_locacao);
  }

  @Post('CriarRemessa')
  async criarRemessa(
    @Body() RemessaCriarDto: RemessaCriarDto,
  ): Promise<RemessaRetornoDto> {
    return this.RemessaService.CriarRemessa(RemessaCriarDto);
  }

  @Patch('AtualizarRemessa/:id')
  async updateRemessa(
    @Body() RemessaAtualizarDto: RemessaAtualizarDto,
    @Param('id') id: number,
  ): Promise<RemessaRetornoDto> {
    return this.RemessaService.UpdateRemessa(id, RemessaAtualizarDto);
  }

  @Patch('ConcluirRemessa/:id')
  async concluirRemessa(@Param('id') id: number): Promise<RemessaRetornoDto> {
    return this.RemessaService.ConcluirRemessa(id);
  }
}
