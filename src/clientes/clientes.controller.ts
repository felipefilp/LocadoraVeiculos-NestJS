import { Controller, Get, Body, Param, Post, Patch } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClienteCriarDto } from './dto/clientes-create.dto';
import { ClienteRetornoDto } from './dto/clientes-create-response.dto';
import { ClientesAtualizarDto } from './dto/clientes-atualizar.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  // GET
  @Get('BuscarTodosClientes')
  findAll(): Promise<ClienteRetornoDto[]> {
    return this.clientesService.findAllClientes();
  }

  @Get('BuscarCliente/:cpf')
  findOne(@Param('cpf') cpf: string): Promise<ClienteRetornoDto> {
    return this.clientesService.findOneClienteByCPF(cpf);
  }

  // POST
  @Post('CriarCliente')
  async createCliente(
    @Body() clienteCriarDto: ClienteCriarDto,
  ): Promise<ClienteCriarDto | null> {
    return await this.clientesService.createCliente(clienteCriarDto);
  }

  // PATCH
  @Patch('AtualizarCliente/:cpf')
  async updateCliente(
    @Param('cpf') cpf: string,
    @Body() dados: ClientesAtualizarDto,
  ): Promise<ClienteRetornoDto> {
    const clienteAtualizado = await this.clientesService.updateCliente(
      cpf,
      dados,
    );
    return new ClienteRetornoDto(clienteAtualizado);
  }
}
