/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Veiculo } from './veiculo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VeiculoRetornoDto } from './dto/veiculos-create-response.dto';
import { plainToInstance } from 'class-transformer';
import { VeiculoCriarDto } from './dto/veiculos-create.dto';
import { VeiculoAtualizarDto } from './dto/veiculos-atualizar.dto';
import { NotFoundMessage } from 'src/validators/message.validator';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo)
    private VeiculoRepository: Repository<Veiculo>,
  ) {}
  async findOneVeiculoByPlaca(placa: string): Promise<VeiculoRetornoDto> {
    const VeiculoLocalizado = await this.VeiculoRepository.findOneBy({ placa });

    return plainToInstance(VeiculoRetornoDto, VeiculoLocalizado, {
      excludeExtraneousValues: true,
    });
  }
  async findAllVeiculos(): Promise<VeiculoRetornoDto[]> {
    const veiculosLocalizados = await this.VeiculoRepository.find();
    return plainToInstance(VeiculoRetornoDto, veiculosLocalizados, {
      excludeExtraneousValues: true,
    });
  }

  async createVeiculo(
    VeiculoCriarDto: VeiculoCriarDto,
  ): Promise<VeiculoRetornoDto> {
    const novoVeiculo = this.VeiculoRepository.create(VeiculoCriarDto);
    const veiculoSalvo = await this.VeiculoRepository.save(novoVeiculo);
    return plainToInstance(VeiculoRetornoDto, veiculoSalvo, {
      excludeExtraneousValues: true,
    });
  }

  async updateVeiculo(
    placa: string,
    VeiculoAtualizarDto: VeiculoAtualizarDto,
  ): Promise<Veiculo> {
    const VeiculoLocalizado = await this.VeiculoRepository.findOneBy({ placa });
    if (!VeiculoLocalizado) {
      throw new NotFoundException(NotFoundMessage('Veiculo'));
    }
    Object.assign(VeiculoLocalizado, VeiculoAtualizarDto);
    VeiculoLocalizado.updated_at = new Date();
    return this.VeiculoRepository.save(VeiculoLocalizado);
  }
}
