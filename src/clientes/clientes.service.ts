/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ClienteCriarDto } from './dto/clientes-create.dto';
import { plainToInstance } from 'class-transformer';
import { ClienteRetornoDto } from './dto/clientes-create-response.dto';
import { ClientesAtualizarDto } from './dto/clientes-atualizar.dto';
import { NotFoundMessage } from 'src/validators/message.validator';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async findAllClientes(): Promise<ClienteRetornoDto[]> {
    const clientes = await this.clientesRepository.find();
    return plainToInstance(ClienteRetornoDto, clientes, {
      excludeExtraneousValues: true,
    });
  }

  async findOneClienteByCPF(cpf: string): Promise<ClienteRetornoDto> {
    const clientelocalizado = await this.clientesRepository.findOneBy({ cpf });
    return plainToInstance(ClienteRetornoDto, clientelocalizado, {
      excludeExtraneousValues: true,
    });
  }

  async findOneClienteById(id: number): Promise<ClienteRetornoDto> {
    const clientelocalizado = await this.clientesRepository.findOneBy({ id });
    return plainToInstance(ClienteRetornoDto, clientelocalizado, {
      excludeExtraneousValues: true,
    });
  }

  async createCliente(
    clienteCriarDto: ClienteCriarDto,
  ): Promise<ClienteRetornoDto> {
    const novoCliente = this.clientesRepository.create(clienteCriarDto);
    const clienteSalvo = await this.clientesRepository.save(novoCliente);
    return plainToInstance(ClienteRetornoDto, clienteSalvo, {
      excludeExtraneousValues: true,
    });
  }

  async updateCliente(
    cpf: string,
    clienteAtualizarDto: ClientesAtualizarDto,
  ): Promise<ClienteRetornoDto> {
    const clienteLocalizado = await this.clientesRepository.findOneBy({ cpf });
    if (!clienteLocalizado) {
      throw new NotFoundException(NotFoundMessage('Cliente'));
    }
    const clienteSalvo = this.clientesRepository.save(clienteAtualizarDto);
    return plainToInstance(ClienteRetornoDto, clienteSalvo, {
      excludeExtraneousValues: true,
    });
  }
}
