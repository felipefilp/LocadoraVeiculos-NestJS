import { Controller, Get, Body, Param, Post, Patch } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClienteCriarDto } from './dto/clientes-create.dto';
import { ClienteRetornoDto } from './dto/clientes-create-response.dto';
import { ClientesAtualizarDto } from './dto/clientes-atualizar.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Cliente')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  // GET
  @Get('BuscarTodosClientes')
  @ApiOperation({ summary: 'Lista todos os clientes.' })
  @ApiResponse({
    status: 200,
  })
  findAll(): Promise<ClienteRetornoDto[]> {
    return this.clientesService.findAllClientes();
  }

  @Get('BuscarCliente/:cpf')
  @ApiOperation({ summary: 'Lista cliente por CPF.' })
  @ApiResponse({
    status: 200,
    description: 'Cliente localizado com sucesso.',
  })
  findOne(@Param('cpf') cpf: string): Promise<ClienteRetornoDto> {
    return this.clientesService.findOneClienteByCPF(cpf);
  }

  // POST
  @Post('CriarCliente')
  @ApiOperation({ summary: 'Criar cliente.' })
  @ApiResponse({
    status: 200,
    description: 'Cliente criado com sucesso.',
  })
  async createCliente(
    @Body() clienteCriarDto: ClienteCriarDto,
  ): Promise<ClienteCriarDto | null> {
    return await this.clientesService.createCliente(clienteCriarDto);
  }

  // PATCH
  @Patch('AtualizarCliente/:cpf')
  @ApiOperation({ summary: 'Atualizar cliente por CPF.' })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente não localizado.',
  })
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
