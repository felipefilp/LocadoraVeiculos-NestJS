/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VendedorService } from './vendedores.service';
import { Vendedor } from './vendedor.entity';
import { VendedorCriarDto } from './dto/vendedores-create.dto';
import { VendedorAtualizarDto } from './dto/vendedores-atualizar.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Vendedor')
@Controller('vendedor')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @Get('BuscarVendedor/:cpf')
  @ApiOperation({ summary: 'Lista vendedor por CPF.' })
  @ApiResponse({
    status: 200,
    description: 'Vendedor localizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Vendedor não localizado.',
  })
  async findOne(@Param('cpf') cpf: string): Promise<Vendedor> {
    return this.vendedorService.findOneVendedorByCPF(cpf);
  }

  @Get('BuscarTodosVendedores')
  @ApiOperation({ summary: 'Lista todos os vendedores.' })
  @ApiResponse({
    status: 200,
  })
  async findAll(): Promise<Vendedor[]> {
    return this.vendedorService.findAllVendedores();
  }

  @Post('CriarVendedor')
  @ApiOperation({ summary: 'Criar vendedor.' })
  @ApiResponse({
    status: 200,
    description: 'Vendedor criado com sucesso.',
  })
  async create(@Body() dados: VendedorCriarDto): Promise<Vendedor> {
    return this.vendedorService.createVendedor(dados);
  }

  @Patch('AtualizarVendedor/:cpf')
  @ApiOperation({ summary: 'Atualizar vendedor por CPF.' })
  @ApiResponse({
    status: 200,
    description: 'Vendedor atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Vendedor não localizado.',
  })
  async updateVendedor(
    @Body() dados: VendedorAtualizarDto,
    @Param('cpf') cpf: string,
  ): Promise<Vendedor> {
    return this.vendedorService.updateVendedor(cpf, dados);
  }
}
