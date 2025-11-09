/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VendedorService } from './vendedores.service';
import { Vendedor } from './vendedor.entity';
import { VendedorCriarDto } from './dto/vendedores-create.dto';
import { VendedorAtualizarDto } from './dto/vendedores-atualizar.dto';

@Controller('vendedor')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @Get('BuscarVendedor/:cpf')
  async findOne(@Param('cpf') cpf: string): Promise<Vendedor> {
    return this.vendedorService.findOneVendedorByCPF(cpf);
  }

  @Get('BuscarTodosVendedores')
  async findAll(): Promise<Vendedor[]> {
    return this.vendedorService.findAllVendedores();
  }

  @Post('CriarVendedor')
  async create(@Body() dados: VendedorCriarDto): Promise<Vendedor> {
    return this.vendedorService.createVendedor(dados);
  }

  @Patch('AtualizarVendedor/:cpf')
  async updateVendedor(
    @Body() dados: VendedorAtualizarDto,
    @Param('cpf') cpf: string,
  ): Promise<Vendedor> {
    return this.vendedorService.updateVendedor(cpf, dados);
  }
}
