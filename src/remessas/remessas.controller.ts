import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RemessasService } from './remessas.service';
import { RemessaRetornoDto } from './dto/remessas-create-response.dto';
import { RemessaCriarDto } from './dto/remessas-create.dto';
import { RemessaAtualizarDto } from './dto/remessas-atualizar.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Remessa')
@Controller('remessa')
export class RemessasController {
  constructor(private readonly RemessaService: RemessasService) {}

  @Get('BuscarRemessa/:id')
  @ApiOperation({ summary: 'Lista a remessa por Id.' })
  @ApiResponse({ status: 200, description: 'Remessa localizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Remessa não localizado' })
  async findRemessaById(@Param('id') id: number): Promise<RemessaRetornoDto> {
    return this.RemessaService.BuscarRemessaPorIdRemessa(id);
  }

  @Get('BuscarRemessasPorLocacaoId/:id')
  @ApiOperation({ summary: 'Lista todas as remessas por LocaçãoId.' })
  @ApiResponse({
    status: 200,
    description: 'Remessas localizadas com sucesso.',
  })
  async findRemessaByLocacaoId(
    @Param('id') id_locacao: number,
  ): Promise<RemessaRetornoDto[]> {
    return this.RemessaService.BuscarRemessaPorIdLocacao(id_locacao);
  }

  @Post('CriarRemessa')
  @ApiOperation({ summary: 'Criar remessa em uma locação.' })
  @ApiResponse({ status: 200, description: 'Remessa criada com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Locação/Veiculo não localizado(a).',
  })
  @ApiResponse({
    status: 400,
    description: 'A remessa já está concluida.',
  })
  async criarRemessa(
    @Body() RemessaCriarDto: RemessaCriarDto,
  ): Promise<RemessaRetornoDto> {
    return this.RemessaService.CriarRemessa(RemessaCriarDto);
  }

  @Patch('AtualizarRemessa/:id')
  @ApiOperation({ summary: 'Atualizar dados de uma remessa' })
  @ApiResponse({ status: 200, description: 'Remessa atualizada com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Remessa não localizada.',
  })
  async updateRemessa(
    @Body() RemessaAtualizarDto: RemessaAtualizarDto,
    @Param('id') id: number,
  ): Promise<RemessaRetornoDto> {
    return this.RemessaService.UpdateRemessa(id, RemessaAtualizarDto);
  }

  @Patch('ConcluirRemessa/:id')
  @ApiOperation({ summary: 'Concluir uma remessa' })
  @ApiResponse({ status: 200, description: 'Remessa concluida com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Remessa já concluida.',
  })
  @ApiResponse({
    status: 404,
    description: 'Remessa não localizada.',
  })
  async concluirRemessa(@Param('id') id: number): Promise<RemessaRetornoDto> {
    return this.RemessaService.ConcluirRemessa(id);
  }
}
