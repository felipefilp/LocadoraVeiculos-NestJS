import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendedor } from './vendedor.entity';
import { Repository } from 'typeorm';
import { VendedorCriarDto } from './dto/vendedores-create.dto';
import { VendedorAtualizarDto } from './dto/vendedores-atualizar.dto';
import { NotFoundMessage } from 'src/validators/message.validator';

@Injectable()
export class VendedorService {
  constructor(
    @InjectRepository(Vendedor)
    private VendedorRepository: Repository<Vendedor>,
  ) {}

  async findOneVendedorByCPF(cpf: string): Promise<Vendedor> {
    const vendedorLocalizado = await this.VendedorRepository.findOneBy({ cpf });
    if (!vendedorLocalizado) {
      throw new NotFoundException('Vendedor não localizado.');
    }
    return vendedorLocalizado;
  }

  async findAllVendedores(): Promise<Vendedor[]> {
    return this.VendedorRepository.find();
  }

  async createVendedor(dados: VendedorCriarDto): Promise<Vendedor> {
    const vendedorCriado = this.VendedorRepository.create(dados);
    return await this.VendedorRepository.save(vendedorCriado);
  }

  async updateVendedor(
    cpf: string,
    dados: VendedorAtualizarDto,
  ): Promise<Vendedor> {
    const vendedorLocalizado = await this.VendedorRepository.findOneBy({ cpf });
    if (!vendedorLocalizado) {
      throw new NotFoundException(NotFoundMessage('Vendedor'));
    }
    Object.assign(vendedorLocalizado, dados);
    return this.VendedorRepository.save(vendedorLocalizado);
  }
}
